import React, { Component } from 'react';
import { convertRgbToHsl } from './Utility';
import './ColorPicker';
import { ColorChangeSource } from './ColorPicker';
import Cursor from './Cursor';

export default class Gradient extends Component {

    constructor(props){
        super(props);
        this.cursorRef = React.createRef();
        this.recolor = this.recolor.bind(this);
        this.drawColor = this.drawColor.bind(this);
        this.drawGradient = this.drawGradient.bind(this);
    }

	render(){
	   	return(
            <div className="color-palette">
                <div className="current-color-container">
                    <canvas id="current-color" height={this.props.height + "px"} width={this.props.width/5 + "px"}></canvas>
                </div>
                <div className="gradient-container">
                    <canvas id="gradient" height={this.props.height + "px"} width={this.props.width + "px"}></canvas>
                    <Cursor ref={this.cursorRef}
                        id={"gradient-cursor"} 
                        canvasId={"gradient"}
                        handleDrag = {this.handleDrag}
                        hsl = {this.props.hsl}
                        top={(this.props.cursorSize/2) * -1} 
                        left = {-1 * (this.props.width - (this.props.cursorSize/2))} 
                        right = {this.props.cursorSize/2} 
                        bottom = {this.props.height - (this.props.cursorSize/2)} 
                        cursorSize = {this.props.cursorSize}/>
                </div>
             </div>
		 );
	 }

	 componentDidMount(){
        this.drawGradient();
        this.drawColor(true);
 	}

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.hsl.hue !== this.props.hsl.hue){
            this.drawGradient();
            this.drawColor(false);
            return true;
        }
        return false;
    }

    drawColor = (changeHsl) => {
        const canvas = document.getElementById('gradient');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const cursor = document.getElementById('gradient-cursor');
        const cursorRect = cursor.getBoundingClientRect();
        let left = (cursorRect.left + (cursorRect.width/2)) - rect.left;
        if(left < 0){
            left = 0;
        }
        else if(left > rect.width - 1){
            left = rect.width - 1;
        }
        let top = (cursorRect.top + (cursorRect.height/2)) - rect.top;
        if(top < 0){
            top = 0;
        }
        else if(top > rect.height - 1){
            top = rect.height - 1;
        }
        const rgb =  ctx.getImageData(left, top, 1, 1).data;
        this.recolor(rgb);
        if(changeHsl){
            const hsl = convertRgbToHsl(rgb[0], rgb[1], rgb[2]);
            const lightness = this.props.hsl.lightness === hsl.l? this.props.hsl.lightness: hsl.l;
            const saturation = this.props.hsl.saturation === hsl.s? this.props.hsl.saturation: hsl.s;
            this.props.changeHsl({
                hue: this.props.hsl.hue,
                lightness: lightness,
                saturation: saturation,
                source: ColorChangeSource.GRADIENT
            });
        }
    }

    drawGradient = () => {
        const canvas = document.getElementById('gradient');
 		const ctx = canvas.getContext('2d');
 		ctx.drawImage(new Image(), 0, 0, canvas.width, canvas.height);
 		let grd1 = ctx.createLinearGradient(0, 0, canvas.width, 0);
 		grd1.addColorStop(0, '#FFFFFF');
 		grd1.addColorStop(1,  'hsl(' + this.props.hsl.hue + ', 100%, 50%)');
		let grd2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
		grd2.addColorStop(0, 'rgba(0,0,0,0)');
		grd2.addColorStop(1,  '#000000');
		ctx.fillStyle = grd1;
 		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = grd2;
 		ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    handleDrag = (data) => {
        this.drawColor(true);
	}

    /*handleGradientClick = (e) => {
        const canvas = document.getElementById('gradient');
        const rect = canvas.getBoundingClientRect();
        const cursor = document.getElementById('gradient-cursor');
        const cursorRect = cursor.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        if(x > rect.width - cursorRect.width){
            x = rect.width - cursorRect.width;
        }
        if(y > rect.height - cursorRect.height){
            y = rect.height - cursorRect.height;
        }
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        this.drawColor();
    }*/

    recolor = (rgb) => {
        const canvas = document.getElementById('current-color');
        const ctx = canvas.getContext('2d');
        const color = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + rgb[3] + ')';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.cursorRef.current.setBackgroundColor(color);
    }
}
