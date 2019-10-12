const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.listen(3000, () => console.log('Starting server: http://localhost:3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (request, response)=> { //set up a route 'api' to receive a request
    console.log(request.body);
    const data = request.body;
    response.json({
        status:"success",
        latitude: data.lat,
        longitude: data.long

    });
});

app.get('/weather/:latlong', async (request, response) => {
    console.log(request.params);
    const latlong = request.params.latlong.split(',');
    console.log(latlong);
    const lat = latlong[0];
    const long = latlong[1];
    console.log(lat, long);
    const api_key = process.env.API_KEY;
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${long}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const location_url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}&accept-language=en`
    const location_response = await fetch(location_url);
    const location_data = await location_response.json();

    const data = {
        weather: weather_data,
        location: location_data
    };

    response.json(data);

    
});