import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe("initial render of objects", () => {
  const { getByText } = render(<App />);
  test("initial render of movies", () => {
    let initialMovies = ["Mulholland Drive", "In the Mood for Love"]
    let renderedFilms = [];
    const htmlCollection = document.getElementsByClassName("title");
    for (let i = 0; i < htmlCollection.length; i++) {
      renderedFilms.push(htmlCollection[i].textContent);
    }
    initialMovies.sort();
    renderedFilms.sort();
    expect(initialMovies.every((value, index) => { return value === renderedFilms[index]; })).toEqual(true);
  });
});
