import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './ColorPicker';

export default class Cursor extends Component {
    
    render(){
        return(
            <div>
                <Draggable bounds={{top: this.props.top, left: this.props.left, right: this.props.right, bottom: this.props.bottom}} onDrag={this.onDrag}>
                    <div id={this.props.id} className="cursor" style={{
                        borderRadius: (this.props.cursorSize/1.5) + "px", 
                        height: this.props.cursorSize + "px", 
                        width: this.props.cursorSize + "px"
                    }}></div>
                </Draggable>
            </div>
        );
    }

    onDrag = (e) => {
        this.props.handleDrag({
            clientX: e.clientX
        })
    }

    setBackgroundColor = (color) => {
        document.getElementById(this.props.id).style.backgroundColor = color;
    }

    setXCoordinate = (x) => {
        document.getElementById(this.props.id).style.left = x - (this.props.cursorSize/2) + 'px';
    }

    setYCoordinate = (y) => {
        document.getElementById(this.props.id).style.top = y - (this.props.cursorSize/2) + 'px';
    }


}