import Clock from '../Clock/Clock.jsx'
import "./WeatherInfo.css";

function WeatherInfo({ weatherData }) {

    let generalWeather;
    const returnGeneralState = (weatherData.main != null);
    const sunrise = weatherData.sys?.sunrise ? getLocalTime(weatherData.sys.sunrise, weatherData.timezone) : "N/A";
    const sunset = weatherData.sys?.sunset ? getLocalTime(weatherData.sys.sunset, weatherData.timezone) : "N/A";

    if (returnGeneralState) {
        generalWeather = (
            <>
                <p>&#x1F4A7; Umid.: {weatherData.main.humidity}%</p>
                <p>&#x1F321;&#xFE0F; Sen. térmica: {weatherData.main.feels_like}°C</p>
                <p>&#x2B07;&#xFE0F; Pressão: {weatherData.main.pressure} hpa</p>
            </>
        );
    }

    function getLocalTime(timestamp, timezone) {
        const date = new Date(timestamp * 1000); // Criar data no UTC
        const utcHours = date.getUTCHours(); // Pegar horas UTC
        const utcMinutes = date.getUTCMinutes();

        // Converter para o horário local da cidade
        let localHours = utcHours + timezone / 3600; // Timezone vem em segundos
        if (localHours < 0) localHours += 24; // Ajustar valores negativos
        if (localHours >= 24) localHours -= 24; // Ajustar caso ultrapasse 23h

        const formattedHours = String(Math.floor(localHours)).padStart(2, "0");
        const formattedMinutes = String(utcMinutes).padStart(2, "0");

        return `${formattedHours}:${formattedMinutes}`;
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

            <div className="timeInfoContainer">
                <div className="localTime">
                    <Clock timezone={weatherData.timezone} />
                </div>
                
                <div className="sunInfo">
                    <h3>&#x2600;&#xFE0F; Sun</h3>
                    <p>
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
                        </svg>
                        Nascer do Sol: {sunrise}
                    </p>
                    {/* hora atual nascer-e-por COORD ? */}
                    <p>
                        <svg
                            className="icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M8 22H16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M5 19H19" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M2 16H22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M12 6C8.68629 6 6 8.68629 6 12C6 13.5217 6.56645 14.911 7.5 15.9687H16.5C17.4335 14.911 18 13.5217 18 12C18 8.68629 15.3137 6 12 6Z" stroke="#1C274C" stroke-width="1.5"></path>
                                <path d="M12 2V3" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
                                <path d="M22 12L21 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
                                <path d="M3 12L2 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
                                <path d="M19.0708 4.92969L18.678 5.32252" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
                                <path d="M5.32178 5.32227L4.92894 4.92943" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
                            </g>
                        </svg>
                        Pôr do Sol: {sunset}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WeatherInfo;