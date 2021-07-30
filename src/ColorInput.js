import React, { Component } from 'react';
import { FormFieldType } from './ColorPicker';
import './ColorPicker.css';

export default class ColorInput extends Component {

    render(){
        const inputType = this.props.type === FormFieldType.HEX? 'text': 'number';
        const className = this.props.type === FormFieldType.HEX? 'input-hex': 'input-num';

        return(
            <div style={{width: this.props.width + "px"}}>
                <div className="color-input-label">{this.props.type}</div>
                <div className="color-input-field">
                    <input 
                        className={"color-input " + className} 
                        type={inputType} 
                        
                        max={this.props.max} 
                        onChange={this.onChange} 
                        value={this.props.value}
                        style={{width: this.props.width + "px"}}/>
                </div>
            </div>                
        );
    }

    onChange = (e) => {
        let value = e.target.value;
        const valid = this.props.validate(value);
        if(valid){
            this.props.onChange({type: this.props.type, value: value});
        }

    }

}