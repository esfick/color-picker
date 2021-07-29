import React, { Component } from 'react';
import ColorForm from './ColorForm';
import './ColorPicker.css';
import Gradient from './Gradient';
import Slider from './Slider';
import {convertHslToRgb, convertRgbToHex, convertRgbToHsl} from './Utility';

export const ColorChangeSource = {
    FORM: 'FORM',
    GRADIENT: 'GRADIENT',
    SLIDER: 'SLIDER'
};

export const FormFieldType = {
    BLUE: 'B',
    GRN: 'G',
    HEX: 'Hex',
    HUE: 'H',
    LGT: 'L',
    RED: 'R',
    SAT: 'S'
}

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
        
        this.onFormChange = this.onFormChange.bind(this);
        this.onChangeHsl = this.onChangeHsl.bind(this);
        this.updateState = this.updateState.bind(this);
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
                    <ColorForm hsl = {this.state.hsl} rgb = {this.state.rgb} hex = {this.state.hex}  changeForm = {this.onFormChange}/>
                </div>
            </div>
        );
    }

    onChangeHsl = (data) => {
        const rgb = convertHslToRgb(data.hue, data.saturation, data.lightness);
        const hex = convertRgbToHex(rgb.r, rgb.g, rgb.b);
        this.updateState(data.hue, data.saturation, data.lightness, rgb.r, rgb.g, rgb.b, hex, data.source);
    }


    onFormChange = (data) => {
        console.log('in onFormChange');
        const type = data.type;
        const source = ColorChangeSource.FORM;
        console.log(data);
        if(type === FormFieldType.HUE || type === FormFieldType.SAT || type === FormFieldType.LGT){
            const h = type === FormFieldType.HUE? parseInt(data.value): this.state.hsl.hue;
            const s = type === FormFieldType.SAT? parseInt(data.value): this.state.hsl.saturation;
            const l = type === FormFieldType.LGT? parseInt(data.value): this.state.hsl.lightness;
            const rgb = convertHslToRgb(h, s, l);
            const hex = convertRgbToHex(rgb.r, rgb.g, rgb.b);
            this.updateState(h, s, l, rgb.r, rgb.g, rgb.b, hex, source);
        }
        else if(type === FormFieldType.RED || type === FormFieldType.GRN || type === FormFieldType.BLUE){
            const r = type === FormFieldType.RED? parseInt(data.value): this.state.rgb.red;
            const g = type === FormFieldType.GRN? parseInt(data.value): this.state.rgb.green;
            const b = type === FormFieldType.BLUE? parseInt(data.value): this.state.rgb.blue;
            //TODO get HSL
            const hsl = convertRgbToHsl(r, g, b);
            const hex = convertRgbToHex(r, g, b);
            this.updateState(hsl.h, hsl.s, hsl.l, r, g, b, hex, source);
        }
        else if(type === FormFieldType.HEX){
           // TODO only update if there are 6 chars
            this.updateState(this.state.hsl.hue, this.state.hsl.saturation, this.state.hsl.lightness, this.state.rgb.red, this.state.rgb.green, this.state.rgb.blue, data.value, source);
        }

    }

    updateState = (h, s, l, r, g, b, hex, source) => {
        this.setState({
            hsl: {
                hue: h,
                saturation: s,
                lightness: l
            },
            rgb: {
                red: r,
                green: g,
                blue: b
            },
            hex: hex,
            source: source
        });
    }


}
