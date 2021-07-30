import React, { Component } from 'react';
import { MAX_SL } from './Utility';
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
        const id = 'gradient';
	   	return(
            <div className="color-palette">
                <div className="current-color-container">
                    <canvas id="current-color" height={this.props.height + "px"} width={this.props.width/5 + "px"}></canvas>
                </div>
                <div className="gradient-container">
                    <canvas id={id} height={this.props.height + "px"} width={this.props.width + "px"} onClick={this.handleGradientClick}></canvas>
                    <Cursor ref={this.cursorRef}
                        id={id + "-cursor"} 
                        canvasId={id}
                        canvasWidth={this.props.width}
                        canvasHeight={this.props.height}
                        handleDrag = {this.handleDrag}
                        hsl = {this.props.hsl}
                        cursorSize = {this.props.cursorSize}
                        moveVertically={true}/>
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
            if(this.props.source === ColorChangeSource.FORM 
                && (prevProps.hsl.saturation !== this.props.hsl.saturation || prevProps.hsl.lightness !== this.props.hsl.lightness)){
                this.changeCursorPosition();
            }
            this.drawColor(false);
            return true;
        }
        return false;
    }

    drawColor = (changeHsl) => {
        const hsl = this.cursorRef.current.getColorAtCurrentPosition();
        this.recolor(hsl);
        if(changeHsl){
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
        const lgt = this.props.hsl.lightness === ''? 0: parseInt(this.props.hsl.lightness);
        const sat = this.props.hsl.saturation === ''? 0: parseInt(this.props.hsl.saturation);
        const w = this.props.width;
        const h = this.props.height;
        //black
        if(lgt === 0){
            x = 0;
            y = h;
        }
        else if (lgt === MAX_SL){
            x = 0;
            y = 0;
        }
        else if(sat === 0){
            x = 0;
            y = h - (h * (lgt/100));
        }
        else if(sat === MAX_SL){
            if(lgt === MAX_SL/2){
                x = w;
                y = 0;
            }
            else if(lgt < MAX_SL/2){
               //x depends on lightness value
               x = w;
               y = h * ((50 - lgt)/50);
            }
            else {
                x = w - (w * ((lgt - 50)/50));
                y = 0;
               
            }
        }
        else {
            //placeholder for other cases TODO figure out
            x = w/2;
            y = h/2;
           // console.log(x + ', ' + y);
        }
        this.cursorRef.current.setXCoordinate(x);
        this.cursorRef.current.setYCoordinate(y);
    }

    recolor = (hsl) => {
        const canvas = document.getElementById('current-color');
        const ctx = canvas.getContext('2d');
        const color =  'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)'; 
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.cursorRef.current.setBackgroundColorBasedOnPosition();
    }

    handleGradientClick = (e) => {
        const rect = document.getElementById('gradient').getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.cursorRef.current.setXCoordinate(x);
        this.cursorRef.current.setYCoordinate(y);
        const hsl = this.cursorRef.current.getColorAtCurrentPosition();
        this.cursorRef.current.setBackgroundColor([hsl.h, hsl.s, hsl.l]);
        this.props.changeHsl({
            hue: hsl.h, 
            saturation: hsl.s, 
            lightness: hsl.l,
            source: ColorChangeSource.GRADIENT
        });
    }

    
}
