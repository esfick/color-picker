import React, { Component } from 'react';
import { convertRgbToHsl } from './Utility';
import Draggable from 'react-draggable';
import './ColorPicker';

export default class Cursor extends Component {

    constructor(props){
        super(props);
        this.state = {
            topBound: 0,
            leftBound: 0,
            rightBound: 0,
            bottomBound: 0
        }
    }
    
    componentDidMount(){
        this.setState({
            topBound: this.props.moveVertically? (this.props.cursorSize/2) * -1: 0,
            leftBound: this.props.cursorSize/2 - this.props.canvasWidth, 
            rightBound: this.props.cursorSize/2,
            bottomBound: this.props.moveVertically? this.props.canvasHeight - this.props.cursorSize/2: 0
        })
    }

    render(){
        return(
            <div>
                <Draggable bounds={{top: this.state.topBound, left: this.state.leftBound, right: this.state.rightBound, bottom: this.state.bottomBound}} onDrag={this.props.handleDrag} >
                    <div id={this.props.id} className="cursor" style={{
                        borderRadius: (this.props.cursorSize/1.5) + "px", 
                        height: this.props.cursorSize + "px", 
                        width: this.props.cursorSize + "px"
                    }}></div>
                </Draggable>
            </div>
        );
    }

    getColorAtCurrentPosition = () => {
        const canvas = document.getElementById(this.props.canvasId);
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const cursor = document.getElementById(this.props.id);
        const cursorRect = cursor.getBoundingClientRect();
        let left = (cursorRect.left + (cursorRect.width/2)) - rect.left;
        if(left < 0){
            left = 0;
        }
        else if(left > rect.width - 1){
            left = rect.width - 1;
        }
        let top = 0;
        if(this.props.moveVertically){
            top = (cursorRect.top + (cursorRect.height/2)) - rect.top;
            if(top < 0){
                top = 0;
            }
            else if(top > rect.height - 1){
                top = rect.height - 1;
            }
        }
        const rgb =  ctx.getImageData(left, top, 1, 1).data;
        return convertRgbToHsl(rgb[0], rgb[1], rgb[2]);
    }

    setBackgroundColorBasedOnPosition = () => {
        const hsl = this.getColorAtCurrentPosition();
        const color = 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)'; 
        document.getElementById(this.props.id).style.backgroundColor = color;
    }

    setBackgroundColor = (hsl) => {
        const color = 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)'; 
        document.getElementById(this.props.id).style.backgroundColor = color;
    }

    setXCoordinate = (x) => {
        this.setState({
            leftBound: -1 * x,
            rightBound: this.props.canvasWidth - x
        });
        document.getElementById(this.props.id).style.left = x - (this.props.cursorSize/2) + 'px';
    }

    setYCoordinate = (y) => {
        this.setState({
            topBound: -1 * y,
            bottomBound: this.props.canvasHeight - y
        });
        document.getElementById(this.props.id).style.top = y - (this.props.cursorSize/2) + 'px';
    }


}