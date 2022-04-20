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

app.get('/getCity', (request, response) => {
    let city = request.query.city_name;
    // response.send(city);
    let dataToSend = data.find(weatherData => weatherData.city_name === city);
    response.send(dataToSend);
    // let selectedPet = new Forecast(dataToSend);
    // response.send(selectedPet);
});

app.get('*', (request, response) => {
  response.send('Not sure what you are a looking for, but it isn\'t here.');
});

// CLASSES
// class Forecast {
//   constructor(weatherObject) {
//     this.date = weatherObject.date;
//     this.desc = weatherObject.desc;
//   }
// }

// LISTEN
// start the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));