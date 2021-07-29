import React, { Component } from 'react';
import './ColorPicker.css';
import Gradient from './Gradient';
import Slider from './Slider';
import {convertHslToRgb, convertRgbToHex} from './Utility';

export const ColorChangeSource = {
    FORM: 'FORM',
    GRADIENT: 'GRADIENT',
    SLIDER: 'SLIDER'
};

export default class ColorPicker extends Component {
	constructor(props){
 		super(props);
        const randomHue = Math.round(Math.random() * 300);
        const saturation = 100;
        const lightness = 50;
        const rgb = convertHslToRgb(randomHue, saturation, lightness);
        const hex = convertRgbToHex(rgb.r, rgb.g, rgb.b);
        this.state = {
            hsl: {
                hue: randomHue,
                saturation: saturation,
                lightness: lightness
            },
            rgb: {
                red: rgb.r,
                green: rgb.g,
                blue: rgb.b
            },
            hex: hex,
            source: ColorChangeSource.SLIDER
        }
        
        this.handleFormChange = this.handleFormChange.bind(this);
        this.onChangeHsl = this.onChangeHsl.bind();
        
	}

    render(){
        const height = 400;
        const width = 500;
        const sliderWidth = width * 1.2
        const cursorSize = 24;
        return(
            <div className="main-container">
                <div className="inner-container">

                    <Gradient hsl = {this.state.hsl} changeHsl = {this.onChangeHsl} height = {height} width = {width} cursorSize = {cursorSize}/>
                    <Slider hsl = {this.state.hsl} source = {this.state.source} changeHsl = {this.onChangeHsl} width = {sliderWidth} cursorSize={cursorSize}/>
                    
                    <form>
                        <label>
                            Hue 
                            <input id="input-hue" type="number" value={this.state.hsl.hue} onChange={this.handleFormChange}/>
                        </label>
                        <label>
                            R 
                            <input id="input-red" type="number" value={this.state.rgb.red} onChange={this.handleFormChange}/>
                        </label>
                        <label>
                            G 
                            <input id="input-green" type="number" value={this.state.rgb.green} onChange={this.handleFormChange}/>
                        </label>
                        <label>
                            B 
                            <input id="input-blue" type="number" value={this.state.rgb.blue} onChange={this.handleFormChange}/>
                        </label>
                    </form>
                </div>
            </div>
        );
    }

    onChangeHsl = (data) => {
        const rgb = convertHslToRgb(data.hue, data.saturation, data.lightness);
        const hex = convertRgbToHex(rgb.r, rgb.g, rgb.b);
        this.setState({
            hsl: {
                hue: data.hue,
                saturation: data.saturation,
                lightness: data.lightness
            },
            rgb: {
                red: rgb.r,
                green: rgb.g,
                blue: rgb.b
            },
            hex: hex,
            source: data.source
        });
        
    }

    handleFormChange = (e) => {
        const rgb = convertHslToRgb(e.target.value, this.state.saturation, this.state.lightness);
        const hex = convertRgbToHex(rgb.r, rgb.g, rgb.b);
        this.setState({
            hsl: {
                ...this.state.hsl,
                hue: e.target.value,
            },
            rgb: {
                red: rgb.r,
                green: rgb.g,
                blue: rgb.b
            },
            hex: hex,
            source: ColorChangeSource.FORM
        });
    }


   /* onChangeFormValue = (data) => {
        console.log(data);
        if(data.field == 'hue'){
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
        });
    
    }*/

}
