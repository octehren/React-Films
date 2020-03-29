import React, { Component } from 'react';

class FilmCell extends Component {
    render() {
        return (
            <ul className={this.props.className}>
                <h3 className="title is-spaced"><p>{this.props.filmTitle}</p></h3>
                <li className="subtitle">{this.props.description}</li>
                <li className="subtitle is-4 is-spaced">{`Buy: ${this.props.priceBuy} / Rent: ${this.props.priceRent} ${this.props.totalEpisodes ? "/ Episodes: " + this.props.totalEpisodes : "" }`}</li>
            </ul>
        )
    }
}

export default FilmCell;
