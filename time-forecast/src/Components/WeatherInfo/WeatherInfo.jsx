import "./WeatherInfo.css";

function WeatherInfo({ weatherData }) {

    console.log(weatherData);

    const returnGeneralState = (weatherData.main != null);
    let generalWeather;

    if (returnGeneralState) {
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
        <div className="weatherContainer">
            <div className="header">
                <h2>Cidade: {weatherData.name ?? "desconhecida ou não informada"}</h2>
                {weatherData?.sys?.country && (
                    <img
                        src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
                        alt={`Bandeira do(a) ${weatherData.sys.country}`}
                        className="countryFlag"
                    />
                )}
            </div>

            {weatherData.weather?.[0]?.icon && (
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={`ícone do clima:${weatherData.weather?.[0]?.description ?? "desconhecido"}`} />
            )}

            <div>{generalWeather}</div>
        </div>
    );
}

export default WeatherInfo;