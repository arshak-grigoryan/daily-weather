import { fillData } from './fillData.js';
import { showContent } from './render.js';
import { showMessage } from './errorMessage.js';

function hideLoader(){
    document.getElementById('loader').style.display = 'none';
}

let autoGeoStateForMessage = true;
let autoRequest,cancelAutoRequest;

function autoGeo(lat,lon,x){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0effd2db9fd35814bdee882537232e55&cnt=7`)
        .then(data => {
            if(data.status !== 200){
                throw Error(data.statusText);
            } else{
                debugger
                clearInterval(autoRequest,0)
                hideLoader()
                autoGeoStateForMessage = false
                showContent()()
                return data.json()
            }
        })
        .then(data => {
            fillData(data)
            clearTimeout(cancelAutoRequest,0)
        })
        .catch(err => console.error('Oops!', err))  
}
export function getWeatherAuto(){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude.toFixed(5);
        let lon = position.coords.longitude.toFixed(5);
        autoRequest = setInterval(()=>autoGeo(lat,lon,autoRequest),1000);
        cancelAutoRequest = setTimeout(()=>{
                hideLoader()
                showMessage(autoGeoStateForMessage)
                clearInterval(autoRequest)
        },10000)
     });
}

export function getWeather(){
    let city = document.getElementById('citySearch').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0effd2db9fd35814bdee882537232e55&cnt=7`)
    .then(data => {
        if(data.status !== 200){
            hideLoader()
            clearInterval(autoRequest,0)
            clearTimeout(cancelAutoRequest,0)
            showMessage(autoGeoStateForMessage = false)
            throw Error(data.statusText);
        } else{
            hideLoader()
            clearInterval(autoRequest,0)
            clearTimeout(cancelAutoRequest,0)
            return data.json()
        }
    })
    .then(data => {
        showContent()()
        fillData(data)
    })
    .catch(err => console.error('Oops!', err))
}
