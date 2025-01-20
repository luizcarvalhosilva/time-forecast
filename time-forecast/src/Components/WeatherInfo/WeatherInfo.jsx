function WeatherInfo({ weatherData }) {

    console.log(weatherData);

    return (
        <div>
            <h1>Informações para:</h1>
            <h2>{weatherData.name ?? "Cidade desconhecida ou não informada"}</h2>

            {weatherData.weather?.[0]?.icon && (
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={`ícone do clima:${weatherData.weather?.[0]?.description ?? "desconhecido"}`} />
            )}

            {weatherData.main?.temp != null ?
                (<p>{Math.round(weatherData.main.temp)}</p>) : (<p>Temperatura indisponível</p>)
            }
        </div>
    );
}

export default WeatherInfo;