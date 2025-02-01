import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle"; // Garante que todos os estilos sejam aplicados corretamente
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import './WeatherInfo5Days.css';

function WeatherInfo5Days({ weather5D }) {
    let dailyForecast = {};

    for (let forecast of weather5D.list) {
        const convertedDate = new Date(forecast.dt * 1000).toLocaleDateString("pt-BR");
        const hour = new Date(forecast.dt * 1000).getUTCHours();

        if (hour === 9 && !dailyForecast[convertedDate]) {
            dailyForecast[convertedDate] = forecast;
        }
    }

    const weatherAt9am = Object.values(dailyForecast).slice(0, 5);

    function getIsoDate() {
        const currentDate = new Intl.DateTimeFormat("pt-BR", {
            year: "numeric", month: "2-digit", day: "2-digit"
        }).format(new Date());

        const [day, month, year] = currentDate.split("/");
        return `${year}-${month}-${day}`;
    }

    function convertDate(dateTxt) {
        if (!dateTxt) return "Data inválida";

        const date = new Date(dateTxt + "T00:00:00");
        return date.toLocaleDateString("pt-BR", {
            weekday: 'long', day: '2-digit', month: '2-digit'
        });
    }

    function calcularTemperaturasDiarias() {
        const todayFormatted = getIsoDate();
        const tempPerDay = {};

        weather5D.list.forEach(record => {
            const date = record.dt_txt.split(" ")[0];

            if (date === todayFormatted) return;

            if (!tempPerDay[date]) {
                tempPerDay[date] = { temp_min: Infinity, temp_max: -Infinity };
            }

            tempPerDay[date].temp_min = Math.min(tempPerDay[date].temp_min, record.main.temp_min);
            tempPerDay[date].temp_max = Math.max(tempPerDay[date].temp_max, record.main.temp_max);
        });

        return Object.entries(tempPerDay).map(([date, temps]) => ({
            date,
            temp_min: temps.temp_min,
            temp_max: temps.temp_max
        }));
    }

    const tempPerDay = calcularTemperaturasDiarias();

    return (
        <div className="generalContainer">
            <h2>&#128197; Próximos 5 dias</h2>

            <div className="carouselContainer">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 }
                    }}
                    navigation={{ clickable: true }}
                    modules={[Navigation]}
                >
                    {weatherAt9am.map((forecast, index) => {
                        const { date, temp_min, temp_max } = tempPerDay[index] || {};

                        return (
                            <SwiperSlide key={forecast.dt}>
                                <div className="forecastCard">
                                    <p className="date">{convertDate(date)}</p>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                        alt={`Ícone do clima: ${forecast.weather?.[0]?.description ?? "desconhecido"}`}
                                    />
                                    <p className="description">{forecast.weather[0].description}</p>
                                    {date && (
                                        <span className="temps">
                                            {temp_max?.toFixed(1)}°C máx / {temp_min?.toFixed(1)}°C min
                                        </span>
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default WeatherInfo5Days;