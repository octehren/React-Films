import React, { Component } from 'react';
import FilmCell from './FilmCell';
import ButtonContent from './ButtonContent';
let filmData = require("../filmData.json");
filmData["tv_seasons"].forEach(function(series) 
    {
        series["total_episodes"] = series.episodes.length;
    }
);

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 0,
            filmData: [filmData["films"], filmData["tv_seasons"]],
            displayedContents: ["Movies", "TV Series"],
            seriesPage: 1,
            moviesPage: 1
        }
        this.toggleDisplayedContent = this.toggleDisplayedContent.bind(this);
    }

    componentDidMount() {

    }

    toggleDisplayedContent = (clickedButton) => { 
        console.log(clickedButton);
        if (clickedButton !== this.state.activeButton) this.setState({ activeButton: (clickedButton + 1) % 2});
    }

    render() {
        return (
            <div className="container">
                {   this.state.displayedContents.map((contentName, index) => {
                        return (
                            <ButtonContent 
                            onClick={() => { this.toggleDisplayedContent(index)} } 
                            label={contentName} 
                            key={index} 
                            isActive={this.state.activeButton === index} 
                            />
                        )
                    })
                
                }
                {   this.state.filmData[this.state.activeButton].map((film, index) => {
                        return (
                            <FilmCell
                            key={index}
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
