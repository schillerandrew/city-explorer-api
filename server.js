'use strict';

// REQUIRE
const express = require('express');
require('dotenv').config();

let data = require('./weather.json');

const cors = require('cors');
const { default: axios } = require('axios');

// USE
const app = express();
app.use(cors());

// define PORT and validate it's working
const PORT = process.env.PORT || 3002;

//ROUTES

app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/sayHello', (request, response) => {
  // console.log(request.query.name);
  let name = request.query.name
  let lastName = request.query.lastName;
  response.send(`Hello, ${name} ${lastName}`);
});

app.get('/weather', async (request, response) => {
  let searchQuery = request.query.searchQuery;
  let city = data.find(c => c.city_name === searchQuery);
  let cityLat = city.lat.slice(0, -2);
  let cityLon = city.lon.slice(0, -2);
  let key = process.env.WEATHERBIT_API_KEY;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&units=I&days=3&lat=${cityLat}&lon=${cityLon}`;
  console.log(url);
  let resultsFromAPI = await axios.get(url);
  console.log(resultsFromAPI.data);
  // let arrayFromAPI = resultsFromAPI.data.map(forecast => new Forecast(forecast));
  // response.status(200).send(arrayFromAPI);
});

app.get('*', (request, response) => {
  response.send('Not sure what you are looking for, but it isn\'t here!');
});

// CLASSES
class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.valid_date;
    this.clouds = cityWeather.clouds;
    this.highTemp = cityWeather.max_temp;
    this.lowTemp = cityWeather.min_temp;
  }
}

// LISTEN
// start the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));