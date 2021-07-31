import React, { Component } from 'react';
import { MAX_HUE } from './Utility';
import './ColorPicker.css';
import { ColorChangeSource } from './ColorPicker';
import Cursor from './Cursor';

export default class Slider extends Component {

    constructor(props){
        super(props);
        this.cursorRef = React.createRef();
    }

    render(){
        return(
            <div className={this.props.id + "-container"}>
                <canvas id={this.props.id} height={this.props.cursorSize + "px"} width={this.props.width + "px"} onClick={this.handleSliderClick}></canvas>
                <Cursor ref={this.cursorRef}
                    id={this.props.id + "-cursor"} 
                    canvasId={this.props.id}
                    canvasWidth={this.props.width}
                    canvasHeight={this.props.cursorSize}
                    handleDrag = {this.handleDrag}
                    hsl = {this.props.hsl}
                    cursorSize = {this.props.cursorSize}
                    moveVertically={false}/>
            </div>
            
        );
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.hsl.hue !== prevProps.hsl.hue && this.props.source === ColorChangeSource.FORM){
            this.moveCursorToHue();
        }
    }

    componentDidMount(){
        const canvas = document.getElementById(this.props.id);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(new Image(), 0, 0, canvas.width, canvas.height);
        let grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grd.addColorStop(0, '#FF0000');
		grd.addColorStop(0.2, '#FFFF00');
		grd.addColorStop(0.4, '#00FF00');
		grd.addColorStop(0.6, '#00FFFF');
		grd.addColorStop(0.8, '#0000FF');
		grd.addColorStop(1, '#FF00FF');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.moveCursorToHue();
    }

    handleDrag = (data) => {
        const hsl = this.cursorRef.current.getColorAtCurrentPosition();
        this.cursorRef.current.setBackgroundColor([hsl.h, 100, 50]);
        this.props.changeHsl({
            hue: hsl.h, 
            saturation: this.props.hsl.saturation, 
            lightness: this.props.hsl.lightness,
            source: ColorChangeSource.SLIDER
        });
	}

    moveCursorToHue = () => {
        let x = 0;
        if(this.props.hsl.hue < 0){
            x = 0;
        }
        else if(this.props.hsl.hue > MAX_HUE){
            x = this.props.width - 1;
        }
        else {
            x = Math.floor(this.props.hsl.hue * (this.props.width/MAX_HUE));
        }
        this.cursorRef.current.setXCoordinate(x);
        this.cursorRef.current.setBackgroundColorBasedOnPosition();
    }

    handleSliderClick = (e) => {
        const rect = document.getElementById(this.props.id).getBoundingClientRect();
        const x = e.clientX - rect.left;
        this.cursorRef.current.setXCoordinate(x);
        const hsl = this.cursorRef.current.getColorAtCurrentPosition();
        this.cursorRef.current.setBackgroundColor([hsl.h, 100, 50]);
        this.props.changeHsl({
            hue: hsl.h, 
            saturation: this.props.hsl.saturation, 
            lightness: this.props.hsl.lightness,
            source: ColorChangeSource.SLIDER
        });
    }

    
}