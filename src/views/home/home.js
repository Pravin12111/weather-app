import React ,{useEffect, useState} from 'react';
import './home.css';
import axios from 'axios';
import weatherImage from './weather.png';
import Background from './background.jpg';


function Home (){

    const [city,setCity] =useState('pune');
    const [temperature,setTemperature] = useState(0);
    const [humidity,setHumidity] =useState(0);
    const [pressure,setPressure] = useState(0);
    const [message,setMessage] = useState('');

    async function loadWeather(){
        try{
            const response =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e6820970948a641e935e3f043319fdd7`)
            setTemperature((response.data.main.temp -270).toFixed(2));
            setHumidity((response.data.main.humidity));
            setPressure((response.data.main.pressure));
            setMessage('✅ Data Fetched Successful');
        }
        catch(err){
            setTemperature(0);
            setHumidity(0);
            setPressure(0);
            setMessage('Please enter valid city');
        }
    }

    useEffect(()=>{
        loadWeather();
    },[city])
    return(
        <div>
            <img src={weatherImage} alt="Weather Icon" className="weather-icon" />
            <img src={Background} alt="Weather Icon" className="weather-icon" />
            <h1 className='app-title'>Weather App</h1>
            <input
            type='text' 
            className='search-bar' 
            placeholder='Enter city....'
            value={city}
            onChange={(e)=> {
                setCity(e.target.value);
            }}
            />
                <p className='normal-text'>{message}</p>
                <h2 className='normal-text'>Temperature: {temperature} °C</h2>
                <h2 className='normal-text'>Humidity: {humidity}</h2>
                <h2 className='normal-text'>pressure: {pressure}</h2>
            
        </div>
    )
}

export default Home