import { createEffect, splitProps } from "solid-js";
import type { WeatherData } from "../types/WeatherAPI";

export default function Weather(props: WeatherData) {
  const [local, others] = splitProps(props, [
    "name",
    "main",
    "description",
    "temp",
    "feels_like",
    "temp_min",
    "temp_max",
    "humidity",
    "wind",
  ]);

  createEffect(() => {
    console.log(local.wind);
  });

  return (
    <>
      <h2 class="text-2xl font-sans text-slate-50 underline decoration-sky-500 decoration-2">
        {local.name}
      </h2>
      <p class="text-md font-sans text-slate-50 ">{local.description}</p>

      <h3 class="text-md font-sans text-slate-50 underline decoration-sky-500 decoration-2 mt-2">
        Temperature
      </h3>
      <p class="text-md font-sans text-slate-50 ">
        Feels like {local.feels_like}°C
      </p>
      <p class="text-md font-sans text-slate-50 ">Top of {local.temp_max}°C</p>
      <p class="text-md font-sans text-slate-50 ">Low of {local.temp_min}°C</p>
      <h3 class="text-md font-sans text-slate-50 underline decoration-sky-500 decoration-2 mt-2">
        Wind
      </h3>
      <p class="text-md font-sans text-slate-50 ">{local.wind.speed}km/h</p>
      <h3 class="text-md font-sans text-slate-50 underline decoration-sky-500 decoration-2 mt-2">
        Humidity
      </h3>
      <p class="text-md font-sans text-slate-50 ">{local.humidity}%</p>
    </>
  );
}
