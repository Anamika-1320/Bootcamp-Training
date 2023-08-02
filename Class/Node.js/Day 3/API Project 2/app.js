const express = require('express');
const { engine } = require('express-handlebars');
const axios = require('axios');

const app = express();
const port = 3000;

// Configure Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Route to fetch weather data from the API and render it in the template
app.get('/', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'http://weatherapi-com.p.rapidapi.com/current.json',
            params: {
                q: '53.1,-0.13'
            },
            headers: {
                'X-RapidAPI-Key': '9ab266ce61msh8d164bf7b2f6b91p1195f0jsnbac22a0cf0c0',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const weatherData = response.data;

        res.render('weather', { weatherData });
    } catch (error) {
        console.error('Error occurred:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        res.status(500).send('Something went wrong');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


