import express from 'express';
import { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const OPENSTREETMAP_API_URL = 'https://nominatim.openstreetmap.org/search';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'; // Replace with your weather API endpoint
const WEATHER_API_KEY = '61a37aa14a0d11dc8627429d229e6732'; // Replace with your weather API key



app.get('/getWeather', async (req: Request, res: Response) => {
  try {
    const cityName = req.query.city as string;

    // Fetching coordinates using OpenStreetMap API
    const openStreetMapResponse = await axios.get(OPENSTREETMAP_API_URL, {
      params: {
        q: cityName,
        format: 'json',
      },
    });

    if (!openStreetMapResponse.data || openStreetMapResponse.data.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { lat, lon } = openStreetMapResponse.data[0];

    // Fetching weather data using another Weather API
    const weatherResponse = await axios.get(WEATHER_API_URL, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        // Add other required parameters for your weather API here
      },
    });

    const weatherData = weatherResponse.data; // Modify this according to your weather API response structure

    res.status(200).json({ weather: weatherData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

let city='Chennai';

const PORT = 3000; // Replace with your desired port number
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/getWeather?city=${city}`);
});


