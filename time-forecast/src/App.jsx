import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';

function App() {
  const [weather, setWeather] = useState();
  

  const cityInputRef = useRef();

  async function citySearch() {
    const city = cityInputRef.current.value;
    const apiKey = "ed3e7e048374f3bb1da9bc490dbf8e7e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    const gatheredData = await axios.get(url)
    setWeather(gatheredData.data)
  }

  return (
    <div className='general-container'>
      <h1>Previsão do Tempo</h1>

      <div className='cityInput'>
        <input ref={cityInputRef} type="text" placeholder='digite a cidade'/>
        <button onClick={citySearch}>Buscar</button>
      </div>

      <div>{weather && <WeatherInfo weatherData={weather}/>}</div>
    </div>
  )
}

export default App