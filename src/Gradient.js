import React, { Component } from 'react';
import { convertRgbToHsl, MAX_SL } from './Utility';
import './ColorPicker';
import { ColorChangeSource } from './ColorPicker';
import Cursor from './Cursor';

export default class Gradient extends Component {

    constructor(props){
        super(props);
        this.cursorRef = React.createRef();
        this.changeCursorPosition = this.changeCursorPosition.bind(this);
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

     componentDidUpdate(prevProps, prevState){
        if(prevProps.hsl !== this.props.hsl){
            if(prevProps.hsl.hue !== this.props.hsl.hue){
                this.drawGradient();
            }
            if(this.props.source === ColorChangeSource.FORM && (prevProps.hsl.saturation !== this.props.hsl.saturation || prevProps.hsl.lightness !== this.props.hsl.lightness)){
                this.changeCursorPosition();
            }
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
        let hue = this.props.hsl.hue === ''? 0: this.props.hsl.hue;
 		grd1.addColorStop(1,  'hsl(' + hue + ', 100%, 50%)');
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


    changeCursorPosition = () => {
        let x = 0, y = 0;
        const l = this.props.hsl.lightness;
        const s = this.props.hsl.saturation;
        // If lightness is 0% then this color is black. Set to bottom left corner regardless of other values
        if(l === 0){
            x = 0;
            y = this.props.height;
        }

        // If lightness is 100%, then this color is white. Set to top left corner regardless of other values
        else if(l === MAX_SL){
            x = 0;
            y = 0;
        }
        
        // If saturation is 0% then this color will be found along the leftmost edge 
        else if(s === 0){
            x = 0;
            // y depends on lightness
        }

        // If saturation is 100% then this color will be found along the rightmost edge 
        else if(s === MAX_SL){
            x = this.props.width;
            // y depends on lightness
        }   

        // Find x coordinate based on saturation




       // this.cursorRef.current.setXCoordinate(x);
      //  this.cursorRef.current.setYCoordinate(y);


/*
        console.log(document.getElementById('gradient').getBoundingClientRect());
        console.log(this.props.hsl.saturation + ' ' + this.props.hsl.lightness);*/
    }

    recolor = (rgb) => {
        const canvas = document.getElementById('current-color');
        const ctx = canvas.getContext('2d');
        const color = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + rgb[3] + ')';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.cursorRef.current.setBackgroundColor(color);
    }

    
}
