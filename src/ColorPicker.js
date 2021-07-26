import React, { Component } from 'react';
import ColorForm from './ColorForm';
import './ColorPicker.css';
import Gradient from './Gradient';
import Slider from './Slider';
import {convertHslToRgb, convertRgbToHex} from './Utility';

export default class ColorPicker extends Component {
	constructor(props){
 		super(props);
        const randomHue = Math.round(Math.random() * 300);
        const saturation = 100;
        const lightness = 50;
        const rgb = convertHslToRgb(randomHue, saturation, lightness);
        const hex = convertRgbToHex(rgb.r, rgb.g, rgb.b);
        this.state = {
            color: {
                hue: randomHue,
                saturation: saturation,
                lightness: lightness,
                red: rgb.r,
                green: rgb.g,
                blue: rgb.b,
                hex: hex
            }
        }
        this.onChangeFormValue = this.onChangeFormValue.bind();
        this.onChangeHsl = this.onChangeHsl.bind();
        
	}

    render(){
        return(
            <div className="main-container">
                <div className="inner-container">
                    
                    <Gradient color = {this.state.color} changeHsl = {this.onChangeHsl} />
                    <Slider color = {this.state.color} changeHsl = {this.onChangeHsl}/>
                    <ColorForm color = {this.state.color} changeFormValue = {this.onChangeFormValue}/>
                    
                </div>
            </div>
        );
    }

    onChangeFormValue = (data) => {
        console.log(data);
       /* if(data.field == 'hue'){
        const rgb = convertHslToRgb(data.hue, this.state.color.saturation, this.state.color.lightness);
        const hex = convertRgbToHex(rgb.r, rgb.g, rgb.b);
        this.setState({
            color: {
                hue: data.value,
                saturation: this.state.color.saturation,
                lightness: this.state.color.lightness,
                red: rgb.r,
                green: rgb.g,
                blue: rgb.b,
                hex: hex
            }
        });*/
    
    }

    onChangeHsl = (data) => {
        const rgb = convertHslToRgb(data.hue, data.saturation, data.lightness);
        const hex = convertRgbToHex(rgb.r, rgb.g, rgb.b);
        this.setState({
            color: {
                hue: data.hue,
                saturation: data.saturation,
                lightness: data.lightness,
                red: rgb.r,
                green: rgb.g,
                blue: rgb.b,
                hex: hex
            }
        });
    }



}
