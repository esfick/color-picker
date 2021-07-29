import React, { Component } from 'react';
import { FormFieldType } from './ColorPicker';
import './ColorPicker.css';

export default class ColorInput extends Component {

    render(){
        const inputType = this.props.type === FormFieldType.HEX? 'text': 'number';
        return(
            <div className="color-input-field">
                <div className="color-input-label">{this.props.type}</div>
                <div className="color-input-field">
                    <input type={inputType} min={this.props.min} max={this.props.max} onChange={this.onChange} value={this.props.value}/>
                </div>
            </div>                
        );
    }

    onChange = (e) => {
        console.log('in onchange');
        const value = e.target.value;
        const valid = this.props.validate(value);
        if(valid){
            this.props.onChange({type: this.props.type, value: value});
        }
        else{
            console.log('invalid');
        }
    }

}