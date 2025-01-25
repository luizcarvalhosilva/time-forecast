import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';
import WeatherInfo5Days from './Components/WeatherInfo5Days/WeatherInfo5Days';

function App() {
  const [weather, setWeather] = useState();
  const [weather5D, setWeather5D] = useState();

  const cityInputRef = useRef();

  async function citySearch() {
    const city = cityInputRef.current.value;
    const apiKey = "ed3e7e048374f3bb1da9bc490dbf8e7e";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    const gatheredData = await axios.get(url);
    const gatheredData5Days = await axios.get(url5Days);

    setWeather(gatheredData.data)
    setWeather5D(gatheredData5Days.data);
  }

  return (
    <div className='general-container'>
      <h1>Previsão do Tempo</h1>

      <div className='cityInput'>
        <input ref={cityInputRef} type="text" placeholder='digite a cidade' />
        <button onClick={citySearch}>Buscar</button>
      </div>

      {weather && <WeatherInfo weatherData={weather} />}
      {weather5D && <WeatherInfo5Days weather5D={weather5D} />}
    </div>
  )
}

export default App