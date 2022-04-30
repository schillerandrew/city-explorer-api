'use strict';

//// REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

//// USE
const app = express();
app.use(cors());

//// define PORT and validate it's working
const PORT = process.env.PORT || 3002;

//// ROUTES
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', async (request, response) => {
  let city = request.query.searchQuery;
  // let city = data.find(c => c.city_name === searchQuery);
  // let cityLat = city.lat.slice(0, -2);
  // let cityLon = city.lon.slice(0, -2);
  let key = process.env.WEATHER_API_KEY;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&units=I&days=3&city=${city}`;
  let resultsFromAPI = await axios.get(url);
  let arrayFromAPI = resultsFromAPI.data.data.map(forecast => new Forecast(forecast));
  response.status(200).send(arrayFromAPI);
});

app.get('/movies', async (request, response, next) => {
  try {
    let city = request.query.searchQuery;
    let key = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}&include_adult=false`;
    let resultsFromAPI = await axios.get(url);
    let arrayFromAPI = resultsFromAPI.data.results.map(movie => new Movie(movie));
    response.status(200).send(arrayFromAPI);
  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('Not sure what you are looking for, but it isn\'t here!');
});

//// CLASSES
class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.valid_date;
    this.clouds = cityWeather.clouds;
    this.highTemp = cityWeather.max_temp;
    this.lowTemp = cityWeather.min_temp;
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.avgVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.releaseDate = movie.release_date
  }
}

//// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

//// LISTEN
//// start the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));