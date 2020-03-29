import React, { Component } from 'react';
import FilmCell from './FilmCell';
import ButtonContent from './ButtonContent';
let filmData = require("../filmData.json");
filmData["tv_seasons"].forEach(function(series) 
    {
        series["total_episodes"] = series.episodes.length;
    }
);
const displayedContents = ["Movies", "TV Series"];
const alternateColors = ["pink", "gray", "gold", "blue", "red"];
const numColors = alternateColors.length;

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

    toggleDisplayedContent = (clickedButton) => {
        const activeButton = this.state.activeButton;
        if (clickedButton !== activeButton) this.setState({ activeButton: (activeButton + 1) % 2});
    }

    render() {
        return (
            <div>
                <div className="container hero">
                    <div className="content-buttons">
                    {   displayedContents.map((contentName, index) => {
                            return (
                                <ButtonContent 
                                onClick={this.toggleDisplayedContent}
                                label={contentName}
                                buttonID={index}
                                key={index} 
                                isActive={this.state.activeButton === index} 
                                />
                            )
                        })
                    }
                    </div>
                </div>
                <div className="container">
                    {   this.state.filmData[this.state.activeButton].map((film, index) => {
                            return (
                                <FilmCell
                                className={`row ${alternateColors[index % numColors]}`}
                                key={index}
                                filmTitle={film.name} 
                                description={film.description} 
                                priceBuy={film.prices.buy} 
                                priceRent={film.prices.rent} 
                                totalEpisodes={film.total_episodes} 
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default MainPage;
