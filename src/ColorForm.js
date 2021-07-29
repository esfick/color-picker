import React, { Component } from 'react';
import ColorInput from './ColorInput';
import { FormFieldType } from './ColorPicker';
import './ColorPicker.css';

export default class ColorForm extends Component {


    render(){
        return(
            <form>
                <ColorInput 
                    type={FormFieldType.HUE} 
                    min = {0}
                    max = {300}
                    value={this.props.hsl.hue} 
                    validate={this.validateHue}
                    onChange={this.props.changeForm} />
                <ColorInput 
                    type={FormFieldType.HEX} 
                    min = {0}
                    max = {10}
                    value={this.props.hex} 
                    validate={this.validateHex}
                    onChange={this.props.changeForm} />
            </form>
        );
    }

    validateHue = (value) => {
        console.log('in validateHue');
        if(!value || isNaN(value)){
            return false;
        }
        let n = parseInt(value);
        if(n < 0 || n > 300){
            return false;
        }
        return true;
    }

    validateRgb = (value) => {
        return true;
    }

    validateSl = (value) => {
        return true;
    }

    validateHex = (value) => {
        console.log('in validateHex');
        if(!value){
            return false;
        }
        /*value = value.trim();
        console.log(value);
        if(value.length !== 6){
            return false;
        }*/
        return true;
    }



}