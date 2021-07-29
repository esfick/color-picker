import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { convertRgbToHsl } from './Utility';
import './ColorPicker';
import { ColorChangeSource } from './ColorPicker';

export default class Gradient extends Component {

    constructor(props){
        super(props);
        this.drawColor = this.drawColor.bind();
        this.drawGradient = this.drawGradient.bind();
    }

	render(){
	   	 return(
            <div className="color-palette">
                <canvas id="current-color" height="300px" width="100px"></canvas>
                <div className="gradient-container">
                    <canvas id="gradient" height="300px" width="500px"></canvas>
                    <Draggable bounds="parent" onDrag={this.handleDrag}>
                        <div id="gradient-cursor"></div>
                    </Draggable>
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
        const currentColor = document.getElementById('current-color');
        const currentColorCtx = currentColor.getContext('2d');
        const cursor = document.getElementById('gradient-cursor');
        const cursorRect = cursor.getBoundingClientRect();
        const rgb =  ctx.getImageData(cursorRect.left - rect.left, cursorRect.top - rect.top, 1, 1).data;
        currentColorCtx.fillStyle = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + rgb[3] + ')';
        currentColorCtx.fillRect(0, 0, canvas.width, canvas.height);
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

    handleDrag = (e) => {
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
}
