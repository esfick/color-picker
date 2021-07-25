import React, { Component } from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import { convertHueToRGB, convertRGBToHue } from './Utility';
import './ColorPicker.css';

export default class Gradient extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="slider-container">
                <canvas id="slider" height="24px" width="600px" onClick={this.handleSliderClick}></canvas>
                <Draggable bounds="parent" onDrag={this.handleDrag}>
                    <div id="slider-cursor"></div>
                </Draggable>
            </div>
        );
    }

    componentDidMount(){
        const canvas = document.getElementById('slider');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(new Image(), 0, 0, canvas.width, canvas.height);
        let grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grd.addColorStop(0, "#FF0000");
		grd.addColorStop(0.2, "#FFFF00");
		grd.addColorStop(0.4, "#00FF00");
		grd.addColorStop(0.6, "#00FFFF");
		grd.addColorStop(0.8, "#0000FF");
		grd.addColorStop(1, "#FF00FF");
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    handleDrag = (e) => {
        const canvas = document.getElementById('slider');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const rgb =  ctx.getImageData(e.clientX - rect.left, 0, 1, 1).data;
        const hue = convertRGBToHue(rgb[0], rgb[1], rgb[2]);
        this.props.changeHue(hue);
	}

    handleSliderClick = (e) => {
        const canvas = document.getElementById('slider');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const cursor = document.getElementById('slider-cursor');
        const cursorRect = cursor.getBoundingClientRect();
        let x = e.clientX - rect.left;
        if(x > rect.width - cursorRect.width){
            x = rect.width - cursorRect.width;
        }
        cursor.style.left = x + 'px';
        const rgb =  ctx.getImageData(e.clientX - rect.left, 0, 1, 1).data;
        const hue = convertRGBToHue(rgb[0], rgb[1], rgb[2]);
        this.props.changeHue(hue);
    }


}