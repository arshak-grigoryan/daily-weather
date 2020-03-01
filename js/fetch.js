import { fillData } from './fillData.js';

function show(){
    let counter = 0;
    return function showback(){
        if(counter === 0){
            let arr = document.getElementById('wrapper').children
            for(let i = 1; i < arr.length; i++){
                arr[i].style.display = 'block'
            }
            counter++
        }
    }
}

export function closeMessage(){
    document.getElementById('errWrapper').style.display = 'none';
    document.body.style.overflow = 'auto';
}
export function getWeatherAuto(){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude.toFixed(5);
        let lon = position.coords.longitude.toFixed(5);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0effd2db9fd35814bdee882537232e55&cnt=7`)
        .then(data => {
            if(data.status !== 200){
                throw Error(data.statusText);
            } else{
                return data.json()
            }
        })
        .then(data => {
            show()()
            fillData(data)
        })
        .catch(err => console.error('Oops!', err))        
     });
}

export function getWeather(){
    let city = document.getElementById('citySearch').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0effd2db9fd35814bdee882537232e55&cnt=7`)
    .then(data => {
        if(data.status !== 200){
            document.body.style.overflow = 'hidden'
            document.getElementById('errWrapper').style.display = 'block'
            throw Error(data.statusText);
        } else{
            return data.json()
        }
    })
    .then(data => {
        show()()
        fillData(data)
    })
    .catch(err => console.error('Oops!', err))
}