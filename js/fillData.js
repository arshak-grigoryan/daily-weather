import { weatherData } from './data.js';
import { renderData } from './render.js';

export function fillData(data){
    let { main, description, icon} = data.weather[0]
    weatherData.weather.main = main
    let arrdes = []
    for (let first of description.split(' ')) {
        first = first.charAt(0).toUpperCase() + first.slice(1);
        arrdes.push(first)
    }
    weatherData.weather.description = arrdes.join(' ');
    weatherData.weather.icon = icon;
    let { temp, feels_like, temp_min, temp_max, pressure, humidity} = data.main;
    weatherData.main.temp = temp;
    weatherData.main.feels_like = feels_like;
    weatherData.main.temp_min = temp_min;
    weatherData.main.temp_max = temp_max;
    weatherData.main.pressure = pressure;
    weatherData.main.humidity = humidity;
    weatherData.visibility = data.visibility;
    weatherData.wind.speed = data.wind.speed;
    weatherData.clouds.all = data.clouds.all
    weatherData.dt = data.dt;
    let { country, sunrise, sunset } = data.sys;
    weatherData.sys.country = country;
    weatherData.sys.sunrise = sunrise;
    weatherData.sys.sunset = sunset;
    weatherData.name = data.name
    renderData(weatherData)
}