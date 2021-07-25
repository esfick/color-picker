import React, { Component } from 'react';
import './ColorPicker.css';
import Gradient from './Gradient';
import Slider from './Slider';

export default class ColorPicker extends Component {
	constructor(props){
 		super(props);
        this.state = {
            hue: 70
        }
		/*this.state = {
			canvasX: 0,
			canvasY: 0,
			cursorX: 0,
			cursorY: 0,
			hex: '#FFFFFF'
		};*/
		this.onChangeHue = this.onChangeHue.bind();
	/*	this.handleDrag = this.handleDrag.bind();
		this.initializeCursor = this.initializeCursor.bind();
		this.initializeGradient = this.initializeGradient.bind();
		this.recolor = this.recolor.bind();*/
	}

    render(){
        return(
            <div className="main-container">
                <div className="inner-container">
                    <Gradient hue = {this.state.hue}/>
                    <Slider hue = {this.state.hue} changeHue = {this.onChangeHue}/>
                    {this.state.hue}
                </div>
            </div>
        );
    }

    onChangeHue = (data) => {
        this.setState({
            hue: data
        });
    }


}
