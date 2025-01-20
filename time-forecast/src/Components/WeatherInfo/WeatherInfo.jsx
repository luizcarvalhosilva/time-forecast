function WeatherInfo({ weatherData }) {

    console.log(weatherData);

    const returnGeneralState = (weatherData.main != null);
    let generalWeather;

    if(returnGeneralState) {
        generalWeather = (
            <>
                <p>Temperatura: {Math.round(weatherData.main.temp)}°C</p>
                <p>Umidade: {weatherData.main.humidity}%</p>
                <p>Sensação térmica: {weatherData.main.feels_like}°C</p>
                <p>Pressão: {weatherData.main.pressure}</p>
                <p>Temperatura máx.: {weatherData.main.temp_max}°C</p>
                <p>Temperatura min.: {weatherData.main.temp_min}°C</p>
                <p>O clima está: {weatherData.weather[0].description}</p>
            </>
        ); 
    }

    return (
        <div>
            <h2>Informações para:</h2>
            <h2>Cidade: {weatherData.name ?? "desconhecida ou não informada"}</h2>

            {weatherData.weather?.[0]?.icon && (
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={`ícone do clima:${weatherData.weather?.[0]?.description ?? "desconhecido"}`} />
            )}

            <div>{generalWeather}</div>
        </div>
    );
}

export default WeatherInfo;