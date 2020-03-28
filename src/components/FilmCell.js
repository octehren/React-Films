import React, { Component } from 'react';

class FilmCell extends Component {
    render() {
        return (
            <ul>
                <h3><p>{this.props.filmTitle}</p></h3>
                <li>{this.props.description}</li>
                <li>{`Buy: ${this.props.priceBuy} / Rent: ${this.props.priceRent} ${this.props.totalEpisodes ? "/ Episodes: " + this.props.totalEpisodes : "" }`}</li>
            </ul>
        )
    }
}

export default FilmCell;
