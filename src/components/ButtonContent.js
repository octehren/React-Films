import React, { Component } from 'react';

class ButtonContent extends Component {
    render() {
        return (
            <button type="button" className={`button ${this.props.isActive ? "active-button" : ""}`} >{this.props.label}</button>
        )
    }
}

export default ButtonContent;
