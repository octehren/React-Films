import React, { Component } from 'react';
import FilmCell from './FilmCell';
let filmData = require("../filmData.json");
filmData["tv_seasons"].forEach(function(series) 
    {
        series["total_episodes"] = series.episodes.length;
    }
);
console.log(filmData);

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 0,
            filmData: [filmData["films"], filmData["tv_seasons"]],
            seriesPage: 1,
            moviesPage: 1
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                {   this.state.filmData[this.state.activeButton].map((film) => {
                        return (
                            <FilmCell 
                            filmTitle={film.name} 
                            description={film.description} 
                            priceBuy={film.prices.buy} 
                            priceRent={film.prices.rent} 
                            episodes={film.total_episodes} 
                            />
                        );
                    })
                }
            </div>
        )
    }
}

export default MainPage;
