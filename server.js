'use strict';

//// REQUIRE
const express = require('express');
require('dotenv').config(); // added .config()
const cors = require('cors');
const weather = require('./modules/weather.js');

//// USE
const app = express();
app.use(cors());

//// define PORT and validate it's working
const PORT = process.env.PORT || 3002;

//// ROUTES
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

//// LISTEN
//// start the server
app.listen(PORT, () => console.log(`Server up on ${PORT}`));