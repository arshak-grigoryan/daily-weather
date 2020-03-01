import { getWeatherAuto, getWeather, closeMessage } from './js/fetch.js';

document.getElementById('sendCity').addEventListener('click', getWeather);

window.addEventListener('load', getWeatherAuto);

document.getElementById('errbtn').addEventListener('click', closeMessage)
