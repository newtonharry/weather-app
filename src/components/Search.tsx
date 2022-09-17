/** @jsxImportSource solid-js */

import {
  createEffect,
  createResource,
  createSignal,
  ErrorBoundary,
  Show,
} from "solid-js";
import type { Coordinates, WeatherData } from "../types/WeatherAPI";
import Weather from "./Weather";

const fetchWeather = async (city: string): Promise<WeatherData> => {
  // Get the coordinates of the city
  let coordinate_data: Coordinates = (
    await (
      await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=5ef72995f1b0fc98f70d7517be811869`
      )
    ).json()
  )[0];

  if (coordinate_data === undefined) {
    throw new Error("Could not get coordinate data");
  }

  // Get the weather data at the coordinates
  let weather_data = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate_data.lat}&lon=${coordinate_data.lon}&units=metric&appid=5ef72995f1b0fc98f70d7517be811869`
    )
  ).json();

  return {
    name: weather_data.name,
    ...weather_data.weather[0],
    ...weather_data.main,
    wind: weather_data.wind,
    visibility: weather_data.visibility,
  };
};

export default function Search() {
  const [city, setCity] = createSignal<string>();
  const [weather] = createResource(city, fetchWeather);

  return (
    <>
      <div class="mt-7">
        <label class="relative block">
          <span class="sr-only">Search</span>
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              class="h-5 w-5 fill-slate-300"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </span>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for your city"
            type="text"
            name="search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCity(e.currentTarget.value);
              }
            }}
          />
        </label>
      </div>
      <div class="p-2 m-6">
        {weather.error ? (
          <p class="text-slate-50">Can't get weather data for that city</p>
        ) : (
          weather() && (
            <Show
              when={!weather.loading}
              fallback={<p class="text-slate-50">Loading...</p>}
            >
              <div class="flex flex-col items-center bg-sky-900 rounded-xl shadow-2xl border-4 border-teal-500 w-48 h-full m-1">
                <Weather {...(weather() as WeatherData)} />
              </div>
            </Show>
          )
        )}
      </div>
    </>
  );
}
