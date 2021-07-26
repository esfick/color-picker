import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './ColorPicker';

const formIdDict = {
    'input-hex': 'hex',
    'input-red': 'red',
    'input-green': 'green',
    'input-blue': 'blue',
    'input-hue': 'hue',
    'input-sat': 'saturation',
    'input-lgt': 'lightness'
}

export default class ColorForm extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="color-values-container">

                <div className="color-values">
                    <div className="color-values-label">Hex</div>
                    <div className="color-values-inputs">
                        <input className="color-value-input-lg" id="input-hex" type="text" onChange={this.handleFormChange} defaultValue={this.props.color.hex} />
                    </div>
                </div>

                <div className="color-values">
                    <div className="color-values-label">RGB</div>
                    <div className="color-values-inputs">
                        <input className="color-value-input" id="input-red" type="number" onChange={this.handleFormChange} defaultValue={this.props.color.red} />
                        <input className="color-value-input" id="input-green" type="number" onChange={this.handleFormChange} defaultValue={this.props.color.green} />
                        <input className="color-value-input" id="input-blue" type="number" onChange={this.handleFormChange} defaultValue={this.props.color.blue} />
                    </div>
                    
                </div>

                <div className="color-values">
                    <div className="color-values-label">HSL</div>
                    <div className="color-values-inputs">
                        <input className="color-value-input" id="input-hue" type="number" onChange={this.handleFormChange} defaultValue={this.props.color.hue} />
                        <input className="color-value-input" id="input-sat" type="number" onChange={this.handleFormChange} defaultValue={this.props.color.saturation} />
                        <input className="color-value-input" id="input-lgt" type="number" onChange={this.handleFormChange} defaultValue={this.props.color.lightness} />
                    </div>
                </div>
                
            </div>
        );
    }

    handleFormChange = (e) => {
        const value = e.target.value;
        let data = {};
        Object.keys(this.props.color).forEach((key, i) => {
            if(key === formIdDict[e.target.id]){
                data[key] = value;
            }
            else {
                data[key] = this.props.color[key];
            }
        });
        this.props.changeFormValue(data);
    }
}