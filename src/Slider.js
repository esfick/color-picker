import React, { Component } from 'react';
import { convertRgbToHsl } from './Utility';
import './ColorPicker.css';
import { ColorChangeSource } from './ColorPicker';
import Cursor from './Cursor';

export default class Gradient extends Component {

    constructor(props){
        super(props);
        this.cursorRef = React.createRef();
        this.moveCursorToHue = this.moveCursorToHue.bind(this);
        this.state = {
            left: 0,
            canvasLeft: 0
        }
    }

    render(){
        return(
            <div className="slider-container">
                <canvas id="slider" height={this.props.cursorSize + "px"} width={this.props.width + "px"}></canvas>
                <Cursor ref={this.cursorRef}
                    id={"slider-cursor"} 
                    canvasId={"slider"}
                    handleDrag = {this.handleDrag}
                    hsl = {this.props.hsl}
                    top={0} 
                    left = {this.state.left * -1} 
                    right = {this.props.width - this.state.left} 
                    bottom = {0} 
                    cursorSize = {this.props.cursorSize}/>
            </div>
            
        );
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.hsl.hue !== prevProps.hsl.hue && this.props.source === ColorChangeSource.FORM){
            this.moveCursorToHue();
        }
    }

    componentDidMount(){
        const canvas = document.getElementById('slider');
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
        this.setState({
            canvasLeft: canvas.getBoundingClientRect().left
        })
        this.moveCursorToHue();
    }

    handleDrag = (data) => {
        const canvas = document.getElementById('slider');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        let left = data.clientX - rect.left + (this.props.cursorSize/2);
        if(left < 0){
            left = 0;
        }
        else if(left > rect.width - 1){
            left = rect.width - 1;
        }
        const rgb =  ctx.getImageData(left, 0, 1, 1).data;
        const hsl = convertRgbToHsl(rgb[0], rgb[1], rgb[2]);
        const hue = hsl.h;
        const color = 'hsl(' + this.props.hsl.hue + ', 100%, 50%)'; 
        this.cursorRef.current.setBackgroundColor(color);
        this.props.changeHsl({
            hue: hue, 
            saturation: this.props.hsl.saturation, 
            lightness: this.props.hsl.lightness,
            source: ColorChangeSource.SLIDER
        });
	}

    moveCursorToHue = () => {
        const maxHue = 300;
        let x = 0;
        if(this.props.hsl.hue < 0){
            x = 0;
        }
        else if(this.props.hsl.hue > maxHue){
            x = this.props.width - 1;
        }
        else {
            x = Math.floor(this.props.hsl.hue * (this.props.width/maxHue));
        }
        this.setState({
            left: x
        }, this.cursorRef.current.setXCoordinate(x));
    }

    /*handleSliderClick = (e) => {
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
    }*/

    
}