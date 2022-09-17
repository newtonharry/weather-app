export type Coordinates = {
  lat: number;
  lon: number;
};

export type WeatherData = {
  name: string;
  main: string;
  description: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: { speed: number; deg: number; gust: number };
  clouds: number;
};
