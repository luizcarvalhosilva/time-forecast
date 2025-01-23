import "./WeatherInfo.css";

function WeatherInfo({ weatherData }) {

    console.log(weatherData);

    const returnGeneralState = (weatherData.main != null);
    let generalWeather;

    if (returnGeneralState) {
        generalWeather = (
            <>
                <p>&#x1F4A7; Umidade: {weatherData.main.humidity}%</p>
                <p>&#x1F321;&#xFE0F; Sensação térmica: {weatherData.main.feels_like}°C</p>
                <p>&#x2B07;&#xFE0F; Pressão: {weatherData.main.pressure}</p>
                <p>Temperatura máx.: {weatherData.main.temp_max}°C</p>
                <p>Temperatura min.: {weatherData.main.temp_min}°C</p>
            </>
        );
    }

    return (
        <div className="weatherContainer">
            <div className="header">
                <div className="cityNameContainer">
                    <span className="cityLabel">Cidade:</span>
                    <h2 className="cityName">{weatherData.name ?? "desconhecida ou não informada"}</h2>
                </div>

                {weatherData?.sys?.country && (
                    <img
                        src={`https://flagcdn.com/w80/${weatherData.sys.country.toLowerCase()}.png`}
                        alt={`Bandeira do(a) ${weatherData.sys.country}`}
                        className="countryFlag"
                    />
                )}
            </div>
            <hr />
            <div className="weatherHead">
                <div className="description">
                    {weatherData.weather?.[0]?.icon && (
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                            alt={`ícone do clima:${weatherData.weather?.[0]?.description ?? "desconhecido"}`} />
                    )}
                    <p>{weatherData.weather[0].description}</p>
                </div>
                <p className="weatherTemp">{Math.round(weatherData.main.temp)}°C</p>
            </div>
            <hr />
            <div className="weatherDetails">{generalWeather}</div>
        </div>
    );
}

export default WeatherInfo;