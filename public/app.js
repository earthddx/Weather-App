let long;
let lat;  
let today = new Date();
let time = today.getHours();


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const darkSky = `weather/${lat},${long}`;
        const response = await fetch(darkSky);
        const json = await response.json();
        
        //set DOM elements from the weather API 
        const{ windSpeed, humidity, temperature, summary, icon } = json.weather.currently;
        document.querySelector('.temperature-description').textContent = summary;
        document.querySelector('.temperature-degree').textContent = Math.round(temperature);
        document.querySelector('.temperature-description-hourly').textContent = json.weather.hourly.summary;
        document.querySelector('.temperature-description-daily').textContent = json.weather.daily.summary;
        document.querySelector('.humidity-section').textContent = "Humidity: " + Math.round(humidity * 100) +' %';
        document.querySelector('.wind-section').textContent = "Wind: " + Math.round(windSpeed) +" km/h";
        
        //set DOM elements from the location API 
        const { city, state, country} = json.location.address;
        document.querySelector('.location-timezone').textContent = city + ', ' + state + ' ' + country;
        if( typeof city === 'undefined' || city === null ){
            document.querySelector('.location-timezone').textContent = state + ', '  + country;
        }
        //background color change depending on the current time of user location
        backgroundColor(time);
        //Formula for celsius
        setCelsius(temperature);
        //set Icon
        setIcons(icon, document.querySelector('.icon'));
        //F to C
        tempFtoC(temperature, celsius);

        //to index.js: send the data as JSON (POST)
        const data = {lat, long };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const data_response = await fetch('/api', options)
        const data_json = await data_response.json();
        console.log(data_json);
    });
} else {
    console.log('geolocation not available');
}

 
function backgroundColor(localTime){ 
    let mainBody = document.querySelector('body');
    let temperatureDescription =  document.querySelector('.temperature-description');

    //local time sensitive background change
    if ((localTime >= 6)&&(localTime <= 11))
    mainBody.style.backgroundImage = "linear-gradient(45deg, #aa4b6b, #6b6b83,#3b8d99)";
    else
        if ((localTime > 11)&&(localTime <= 17))
        mainBody.style.backgroundImage = "linear-gradient( 45deg, #000046,#1CB5E0)";
        else
            if ((localTime > 17)&&(localTime < 21))
            mainBody.style.backgroundImage = "linear-gradient( 45deg, #aa4b6b, #6b6b83,#3b8d99)";
            else
                if (((localTime >= 21)&&(localTime <=24))||((localTime >= 0)&&(localTime < 6)))
                mainBody.style.backgroundImage = "linear-gradient( 45deg, #000000, #434343)";
    //also, the background has to be changed depending on the weather as well.
    if ( (temperatureDescription.textContent =="Overcast") || (temperatureDescription.textContent=="Rain") || (temperatureDescription.textContent=="Mostly Cloudy") )
        mainBody.style.backgroundImage = "linear-gradient(45deg, #0F2027, #203A43, #2C5364)";
    //to be continued...       
    return mainBody.style.background;

};

function setCelsius(temperature){
    return celsius = (temperature-32) * (5 / 9);
};

function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
};

function tempFtoC(farenheit, celsius){
    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');
    let temperatureDegree = document.querySelector('.temperature-degree');

    return temperatureSection.addEventListener('click', ()=>{  
        if (temperatureSpan.textContent === '|°F') {
            temperatureSpan.textContent ='|°C';
            temperatureDegree.textContent = Math.round(celsius);
        } else {
            temperatureSpan.textContent = '|°F' ;
            temperatureDegree.textContent = Math.round(farenheit); 
        }
    });
};
  

