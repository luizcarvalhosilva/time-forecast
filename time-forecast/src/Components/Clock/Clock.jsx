import { useEffect, useState } from "react";

function Clock({ timezone }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const utcTime = new Date(); // Hora UTC local
      // Ajuste para o fuso horário da cidade. O `timezone` vem em segundos.
      const localTime = new Date(utcTime.getTime() + timezone * 1000); // Converter o timezone de segundos para milissegundos.
      setTime(localTime);
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [timezone]);

  const formatTime = (date) => {
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="clock">
      <h3>Hora Local</h3>
      <p>{formatTime(time)}</p>
    </div>
  );
}

export default Clock;
