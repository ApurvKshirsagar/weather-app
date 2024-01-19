"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const OPENSTREETMAP_API_URL = 'https://nominatim.openstreetmap.org/search';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'; // Replace with your weather API endpoint
const WEATHER_API_KEY = '61a37aa14a0d11dc8627429d229e6732'; // Replace with your weather API key
app.get('/getWeather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cityName = req.query.city;
        // Fetching coordinates using OpenStreetMap API
        const openStreetMapResponse = yield axios_1.default.get(OPENSTREETMAP_API_URL, {
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
        const weatherResponse = yield axios_1.default.get(WEATHER_API_URL, {
            params: {
                lat,
                lon,
                appid: WEATHER_API_KEY,
                // Add other required parameters for your weather API here
            },
        });
        const weatherData = weatherResponse.data; // Modify this according to your weather API response structure
        res.status(200).json({ weather: weatherData });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
let city = 'Chennai';
const PORT = 3000; // Replace with your desired port number
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/getWeather?city=${city}`);
});
