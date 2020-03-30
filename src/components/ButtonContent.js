import React, { Component } from 'react';

class ButtonContent extends Component {
    render() {
        return (
            <button type="button" btn={this.props.buttonID} onClick={this.handleClick} className={`button is-rounded ${this.props.isActive ? "is-focused" : ""}`} >{this.props.label}</button>
        )
    }

    handleClick = (e) => {
        this.props.onClick(e);
    }
}

export default ButtonContent;
