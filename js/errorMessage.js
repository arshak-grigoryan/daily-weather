export function closeMessage(){
    document.getElementById('citySearch').readOnly = false;
    document.getElementById('message').textContent = 'There is nothing found. Please check city name and try again.';        
    document.getElementById('errWrapper').style.display = 'none';
    document.body.style.overflow = 'auto';
}

export function showMessage(bool){
    document.getElementById('citySearch').readOnly = true;
    document.getElementById('errWrapper').style.display = 'block';
    document.body.style.overflow = 'hidden';
    if(bool === true){
        document.getElementById('message').textContent = 'Can not detect your location. Use search for finding city.'
    } else{
        document.getElementById('message').textContent = 'There is nothing found. Please check city name and try again.'        
    }
}