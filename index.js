import { getWeatherAuto, getWeather } from './js/fetch.js';
import { closeMessage } from './js/errorMessage.js';

document.getElementById('sendCity').addEventListener('click', getWeather);

document.querySelector('form').addEventListener('submit', e => e.preventDefault());
document.querySelector('form').addEventListener('keypress', e => e.key === 'Enter' ? getWeather() : null );

window.addEventListener('load', getWeatherAuto);

document.getElementById('errbtn').addEventListener('click', closeMessage)
