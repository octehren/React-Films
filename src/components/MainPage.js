import React, { Component } from 'react';
import FilmCell from './FilmCell';
import ButtonContent from './ButtonContent';
let filmData = require("../filmData.json");
filmData["tv_seasons"].forEach(function(series) 
    {
        series["totalEpisodes"] = series.episodes.length;
    }
);
const displayedContents = ["Movies", "TV Series"];
const alternateColors = ["pink", "gray", "gold", "blue", "red"];
const numColors = alternateColors.length;
const apiKey = "5215a9b636f2a7eb6edef75d09a921da"; // ideally this would be hidden in a local variable

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 0,
            filmData: [filmData["films"], filmData["tv_seasons"]],
            respectiveContentPages: [1, 1], // index 0 is movies, index 1 is tv series, etc. correlates w/ displayedContents
            externalFilmData: []
        }
    }

    componentDidMount() {
        if (this.state.externalFilmData.length > 0) {
            console.log(this.state.externalFilmData);
            this.setState({externalFilmData: []});
        }
    }

    toggleDisplayedContent = (clickedButton) => {
        const activeButton = this.state.activeButton;
        if (clickedButton !== activeButton) this.setState({ activeButton: (activeButton + 1) % 2});
    }

    fetchNumOfTVShowEpisodes = (tvShow) => {
        const url = `https://api.themoviedb.org/3/tv/${tvShow.id}?api_key=${apiKey}`;
        let request = new Request(url);
        request.headers.append('Content-Type', 'application/json');
        return fetch(request)
        .then((response) => {
            return response.text();
        }).then((text) => {
            return JSON.parse(text)["number_of_episodes"];
        });
    }

    fetchExternalContent = () => {
        const contentIndex = this.state.activeButton; // 0 for movies, 1 for series
        const pagetoFetch = this.state.respectiveContentPages[contentIndex]; 
        const contentTypeParam = ["movie", "tv"][this.state.activeButton]; // 1 for movies, 2 for series
        const url = `https://api.themoviedb.org/3/discover/${contentTypeParam}?api_key=${apiKey}&page=${pagetoFetch}`;
        let request = new Request(url);
        request.headers.append('Content-Type', 'application/json');
        fetch(request)
        .then((response) => {
            return response.text();
        }).then((text) => {
            let results = JSON.parse(text)["results"].slice(0, 3);
            if (contentTypeParam === "tv") {
                let promises = [];
                results.forEach((tvShow) => { 
                    promises.push(this.fetchNumOfTVShowEpisodes(tvShow));
                });
                Promise.allSettled(promises).then((totalEpisodes) => {
                    results.map((tvShow, index) => {
                        tvShow.totalEpisodes = totalEpisodes[index];
                    });
                    this.setState({externalFilmData: results});
                })
            } else {
                this.setState({externalFilmData: results});
            }
        })
    }

    render() {
        return (
            <div>
                <div className="container hero">
                    <div className="content-buttons">
                        <button class="button is-info is-round" onClick={this.fetchExternalContent}>
                            See More {displayedContents[this.state.activeButton]}
                        </button>
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
                                totalEpisodes={film.totalEpisodes} 
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
