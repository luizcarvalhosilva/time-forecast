import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  async function citySearch() {
    const city = cityInputRef.current.value;
    const apiKey = "ed3e7e048374f3bb1da9bc490dbf8e7e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    const gatheredData = await axios.get(url)
  return (
    <>
      <h1>teste</h1>
    </>
  )
}

export default App