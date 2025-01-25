import './WeatherInfo5Days.css'

function WeatherInfo5Days({ weather5D }) {

    let dailyForecast = {};

    for (let forecast of weather5D.list) {
        const convertedDate = new Date(forecast.dt * 1000).toLocaleDateString();
        const hour = new Date(forecast.dt * 1000).getUTCHours();
        const currentHour = new Date().getHours;

        if(hour === 9 && !dailyForecast[convertedDate]) {
            dailyForecast[convertedDate] = forecast;
        }
    }

    const weatherAt9am = Object.values(dailyForecast).slice(0,5);
    
    console.log(weatherAt9am);

    return (
        <div className="generalContainer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iste tempora, inventore dolores recusandae, nostrum ipsum iusto blanditiis, nesciunt iure exercitationem illo error atque repellat sequi saepe illum. Libero, adipisci!

            {weatherAt9am.map(forecast => ( 
                <div key={forecast.dt}>
                    <p>dia da semana</p>
                    <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
                    alt={`ícone do clima: ${forecast.weather?.[0]?.description ?? "desconhecido"}`}/>
                    <p>{forecast.weather[0].description}</p>
                    <p>{forecast.main.temp} °C</p>
                </div>
            ))}
        </div>
    );
}

export default WeatherInfo5Days;