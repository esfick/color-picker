import React, { Component } from 'react';
import ColorInput from './ColorInput';
import { FormFieldType } from './ColorPicker';
import { MAX_HUE, MAX_RGB, MAX_SL } from './Utility';
import './ColorPicker.css';

export default class ColorForm extends Component {

    render(){
        const width = this.props.width/10;
        const hexWidth = this.props.width * .15;
        return(
            <div className="form-container" style={{width: this.props.width + "px"}}>
            <form className="color-form">
                <div className="color-form-section">
                    <ColorInput 
                        type={FormFieldType.HUE} 
                        min = {0}
                        max = {MAX_HUE}
                        width = {width}
                        value={this.props.hsl.hue} 
                        validate={this.validateHue}
                        onChange={this.props.changeForm} />
                    <ColorInput 
                        type={FormFieldType.SAT} 
                        min = {0}
                        max = {MAX_SL}
                        width = {width}
                        value={this.props.hsl.saturation} 
                        validate={this.validateSl}
                        onChange={this.props.changeForm} />
                    <ColorInput 
                        type={FormFieldType.LGT} 
                        min = {0}
                        max = {MAX_SL}
                        width = {width}
                        value={this.props.hsl.lightness} 
                        validate={this.validateSl}
                        onChange={this.props.changeForm} />
                </div>

                <div className="color-form-section">
                    <ColorInput 
                        type={FormFieldType.RED} 
                        min = {0}
                        max = {MAX_RGB}
                        width = {width}
                        value={this.props.rgb.red} 
                        validate={this.validateRgb}
                        onChange={this.props.changeForm} />
                    <ColorInput 
                        type={FormFieldType.GRN} 
                        min = {0}
                        max = {MAX_RGB}
                        width = {width}
                        value={this.props.rgb.green} 
                        validate={this.validateRgb}
                        onChange={this.props.changeForm} />
                    <ColorInput 
                        type={FormFieldType.BLUE} 
                        min = {0}
                        max = {MAX_RGB}
                        width = {width}
                        value={this.props.rgb.blue} 
                        validate={this.validateRgb}
                        onChange={this.props.changeForm} />
                </div>

                <div className="color-form-section">
                    <ColorInput 
                        type={FormFieldType.HEX} 
                        min = {0}
                        max = {10}
                        width = {hexWidth}
                        value={this.props.hex} 
                        validate={this.validateHex}
                        onChange={this.props.changeForm} />
                </div>
            </form>
            </div>
        );
    }

    validateHex = (value) => {
        if(!value){
            return value === '';
        }
        value = value.trim();
        if(value.length > 6){
            return false;
        }
        let valid = true;
        [...value.toUpperCase()].forEach((c, i) => {
            if((c < '0' || c > '9') && (c < 'A' || c > 'F')){
                valid = false;
            }
        })
        return valid;
    }

    validateHue = (value) => {
        return this.validateNum(value, MAX_HUE);
    }

    validateRgb = (value) => {
        return this.validateNum(value, MAX_RGB);
    }

    validateSl = (value) => {
        return this.validateNum(value, MAX_SL);
    }

    validateNum = (value, max) => {
        if(!value || isNaN(value)){
            return value === ''; // Return true if the user deleted input. This will be considered to be 0.
        }
        let n = parseInt(value);
        if(n < 0 || n > max){
            return false;
        }
        return true;
    }



}