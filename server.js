'use strict';

// REQUIRE
const express = require('express');
require('dotenv').config();

let data = require('./weather.json');

const cors = require('cors');

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

app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  let cityWeather = data.find(c => c.city_name === searchQuery);
  let selectedCity = cityWeather.data.map(cityObj => {
    return new Forecast(cityObj);
  });
  response.send(selectedCity);
});

app.get('*', (request, response) => {
  response.send('Not sure what you are looking for, but it isn\'t here!');
});

// CLASSES
class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.datetime;
    this.desc = cityWeather.weather.description;
  }
}

// LISTEN
// start the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));