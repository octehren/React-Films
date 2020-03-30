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

    toggleDisplayedContent = (clickedButton) => {
        const activeButton = this.state.activeButton;
        if (clickedButton !== activeButton) this.setState({ activeButton: (activeButton + 1) % 2});
    }

    updateFilmData = () => {
        if (this.state.externalFilmData.length > 0) {
            let formatted = [];
            this.state.externalFilmData.forEach((filmData) => {
                formatted.push({
                    "name": filmData.title,
                    "description": filmData.overview,
                    "totalEpisodes": filmData.totalEpisodes,
                    "prices": {
                        "buy": Math.floor((Math.random() * 500) + 500),
                        "rent": Math.floor((Math.random() * 250) + 250)
                    }
                });
            });
            const activeButton = this.state.activeButton;
            let updatedFilmData = this.state.filmData;
            updatedFilmData[activeButton] = [...formatted, ...updatedFilmData[activeButton]];
            let incrementedCounter = this.state.respectiveContentPages;
            incrementedCounter[activeButton] = incrementedCounter[activeButton] + 1;
            this.setState({filmData: updatedFilmData, respectiveContentPages: incrementedCounter}, () => { 
                this.setState({externalFilmData: []})
            });
        }
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
                        //normalizes 'title' with the 'name'
                        tvShow.title = tvShow.name;
                        tvShow.totalEpisodes = totalEpisodes[index].value;
                    });
                    this.setState({externalFilmData: results}, () => { this.updateFilmData(); });
                })
            } else {
                this.setState({externalFilmData: results}, () => { this.updateFilmData(); });
            }
        })
    }

    render() {
        return (
            <div>
                <div className="container hero">
                    <div className="content-buttons">
                        <button className="button is-info is-round" onClick={this.fetchExternalContent}>
                            See More {displayedContents[this.state.activeButton]}
                        </button>
                        {   displayedContents.map((contentName, index) => {
                                return (
                                    <ButtonContent 
                                    onClick={this.toggleDisplayedContent}
                                    label={contentName}
                                    btn={index}
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
