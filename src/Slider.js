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
                <canvas id="slider" height="20px" width="600px"></canvas>
                <Draggable bounds="parent" onDrag={this.handleDrag}>
                    <canvas id="slider-cursor" width="20px" height="20px"></canvas>
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

        const cursor = document.getElementById('slider-cursor');
        const cursorCtx = cursor.getContext('2d');
        
        cursorCtx.beginPath();
        cursorCtx.arc(10, 10, 10, 0, 2 * Math.PI, false);
        cursorCtx.fillStyle = "black";
        cursorCtx.fill();
        cursorCtx.strokeStyle = "white";
        cursorCtx.stroke();

    }

    handleDrag = (e) => {
        const canvas = document.getElementById('slider');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const rgb =  ctx.getImageData(e.clientX - rect.left, 0, 1, 1).data;
        const hue = convertRGBToHue(rgb[0], rgb[1], rgb[2]);
        this.props.changeHue(hue);
	}


}