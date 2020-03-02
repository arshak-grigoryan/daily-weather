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
let bool = true 
function autoGeo(lat,lon,x){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0effd2db9fd35814bdee882537232e55&cnt=7`)
        .then(data => {
            if(data.status !== 200){
                throw Error(data.statusText);
            } else{
                debugger
                bool = false
                clearInterval(x)
                return data.json()
            }
        })
        .then(data => {

            document.getElementById('loader').style.display = 'none';
            show()()
            fillData(data)
        })
        .catch(err => console.error('Oops!', err))  
}
let x;
export function getWeatherAuto(){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude.toFixed(5);
        let lon = position.coords.longitude.toFixed(5);
        x = setInterval(()=>autoGeo(lat,lon,x),1000);
        let y = setTimeout(()=>{
            if(bool){
                document.getElementById('loader').style.display = 'none';
                document.getElementById('errWrapper').style.display = 'block';
                document.getElementById('message').textContent = 'Nothing found. Use search for finding city'
                clearInterval(x)
            }
        },15000)
     });
}

export function getWeather(){
    document.getElementById('loader').style.display = 'block';
    let city = document.getElementById('citySearch').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0effd2db9fd35814bdee882537232e55&cnt=7`)
    .then(data => {
        if(data.status !== 200){
            document.body.style.overflow = 'hidden'
            document.getElementById('errWrapper').style.display = 'block'
            throw Error(data.statusText);
        } else{
            setTimeout(()=>clearInterval(x),0)
            return data.json()
        }
    })
    .then(data => {
        document.getElementById('loader').style.display = 'none';
        show()()
        fillData(data)
    })
    .catch(err => console.error('Oops!', err))
}
