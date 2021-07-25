import React, { Component } from 'react';
import './ColorPicker.css';
import Gradient from './Gradient';
import Slider from './Slider';

export default class ColorPicker extends Component {
	constructor(props){
 		super(props);
        this.state = {
            hue: 70,
            hex: [2, 2, 2]
        }
		this.onChangeHue = this.onChangeHue.bind();
        this.onChangeHex = this.onChangeHex.bind();
	}

    render(){
        return(
            <div className="main-container">
                <div className="inner-container">
                    <Gradient hue = {this.state.hue} changeHex = {this.onChangeHex} />
                    <Slider hue = {this.state.hue} changeHue = {this.onChangeHue}/>
                    {this.state.hex}
                </div>
            </div>
        );
    }

    onChangeHue = (data) => {
        this.setState({
            hue: data
        });
    }

    onChangeHex = (data) => {
        this.setState({
            hex: data
        });
    }


}
