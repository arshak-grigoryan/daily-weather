function getSpan(str){
    return ` <span style="font-size:14px">${str}</span> `
}

function getDayNightDuration(sunrise, sunset){
    let unix_timestamprise = sunrise,
        unix_timestampset = sunset,
        daterise = new Date(unix_timestamprise * 1000),
        dateset = new Date(unix_timestampset * 1000),
        dayHour = Math.floor(((dateset - daterise) / 3600 / 1000)),
        dayMinute = (((dateset - daterise) / 3600 / 1000 - dayHour) * 60).toFixed(0),
        nightHour = 24 - dayHour,
        nightMinute = 60 - dayMinute;
    return ([dayHour + getSpan('h') + dayMinute + getSpan('m'), 
            nightHour + getSpan('h') + nightMinute + getSpan('m')])
}

function weatherNow(data){
    document.getElementById('city-country').textContent = `${data.name}, ${data.sys.country}`
    document.getElementById('icon').src =  `https://openweathermap.org/img/w/${data.weather.icon}.png`;
    document.getElementById('main-temp').innerHTML = `${ parseInt((Number(data.main.temp)-273.15))} <sup>o</sup>`;
    document.getElementById('temp-max').innerHTML = `${ parseInt((Number(data.main.temp_max)-273.15))}&nbsp<sup>o</sup><span>C</span>`
    document.getElementById('temp-min').innerHTML = `${ parseInt((Number(data.main.temp_min)-273.15))}&nbsp<sup>o</sup><span>C</span>`
    document.getElementById('main').textContent = `${data.weather.main}`;
    let unix_timestamp = data.dt;
    let date = new Date(unix_timestamp * 1000);
    let formattedTime = 'Updated as of '+ date.getHours() + ':' + ("0" + date.getMinutes()).substr(-2);
    document.getElementById('uptime').textContent = formattedTime;      
    document.getElementById('feelsLikeVal').innerHTML = parseInt((Number(data.main.feels_like)-273.15)) + '&nbsp<sup>o</sup><span>C</span>';
    document.getElementById('windSpeedVal').innerHTML = parseInt((Number(data.wind.speed)*1.6)) + getSpan(' km/h');
    document.getElementById('humidityVal').innerHTML = parseInt((Number(data.main.humidity))) + getSpan(' %');
    document.getElementById('cloudinessVal').innerHTML = data.clouds.all + getSpan(' %');
    document.getElementById('pressureVal').innerHTML = data.main.pressure + getSpan(' hPa'); 
    document.getElementById('visibilityVal').innerHTML = data.visibility > 0 ? (data.visibility / 1000).toFixed(0) + getSpan('km') : 'N/A';
    let day = getDayNightDuration(data.sys.sunrise, data.sys.sunset);
    document.getElementById('dayDurVal').innerHTML = day[0];
    document.getElementById('nightDurVal').innerHTML = day[1];
}
export function renderData(data){
    let unix_timestamprise = data.sys.sunrise
    let daterise = new Date(unix_timestamprise * 1000);
    let formattedTimerise = daterise.getHours() + ':' + ("0" + daterise.getMinutes()).substr(-2);
    document.getElementById('sunrise').textContent = `Sunrise ${formattedTimerise}`
    let unix_timestampset = data.sys.sunset
    let dateset = new Date(unix_timestampset * 1000);
    let formattedTimeset = dateset.getHours() + ':' + ("0" + dateset.getMinutes()).substr(-2);
    document.getElementById('sunset').textContent = `Sunset ${formattedTimeset}`
    weatherNow(data)
}