import React, { Component } from 'react';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <ul>
                <p><h3>{this.props.filmTitle}</h3></p>
                <li>{this.props.description}</li>
                <li>{`Buy: ${this.props.priceBuy} Rent: ${this.props.priceRent}`}</li>
            </ul>
        )
    }
}

export default MainPage;
