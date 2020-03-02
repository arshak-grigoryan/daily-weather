import { getWeatherAuto, getWeather } from './js/fetch.js';
import { closeMessage } from './js/errorMessage.js';

document.getElementById('sendCity').addEventListener('click', getWeather);

window.addEventListener('load', getWeatherAuto);

document.getElementById('errbtn').addEventListener('click', closeMessage)
