import React, { Component } from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import { getHexValue } from './Utility';
import './ColorPicker';

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
                        <canvas id="gradient-cursor" width="30px" height="30px"></canvas>
                    </Draggable>
                </div>
             </div>
		 );
	 }

	 componentDidMount(){
        this.drawGradient();
        const canvas = document.getElementById('gradient-cursor');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.drawColor();
        

 	}

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.hue !== this.props.hue){
            this.drawGradient();
            this.drawColor();
            return true;
        }
        return false;
    }

    drawColor = () => {
        const canvas = document.getElementById('gradient');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const cursor = document.getElementById('gradient-cursor');
        const cursorCtx = cursor.getContext('2d');
        const cursorRect = cursor.getBoundingClientRect();
        const rgb =  ctx.getImageData(cursorRect.left - rect.left, cursorRect.top - rect.top, 1, 1).data;
        const hex = '#' + getHexValue(rgb[0]) + getHexValue(rgb[1]) + getHexValue(rgb[2]);
        document.getElementById('current-color').getContext('2d').fillStyle = hex;
        document.getElementById('current-color').getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
    }

    drawGradient = () => {
        const canvas = document.getElementById('gradient');
 		const ctx = canvas.getContext('2d');
 		ctx.drawImage(new Image(), 0, 0, canvas.width, canvas.height);
 		let grd1 = ctx.createLinearGradient(0, 0, canvas.width, 0);
 		grd1.addColorStop(0, "#FFFFFF");
 		grd1.addColorStop(1,  'hsl(' + this.props.hue + ', 100%, 50%)');
		let grd2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
		grd2.addColorStop(0, 'rgba(0,0,0,0)');
		grd2.addColorStop(1,  '#000000');


		ctx.fillStyle = grd1;
 		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = grd2;
 		ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    handleDrag = (e) => {
      /*  const canvas = document.getElementById('gradient');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        const rgb =  ctx.getImageData(e.clientX - rect.left, e.clientY - rect.top, 1, 1).data;
 
        const hex = '#' + getHexValue(rgb[0]) + getHexValue(rgb[1]) + getHexValue(rgb[2]);
        document.getElementById('current-color').getContext('2d').fillStyle = hex;
        document.getElementById('current-color').getContext('2d').fillRect(0, 0, canvas.width, canvas.height);*/
        this.drawColor();

	}
}
