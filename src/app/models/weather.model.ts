export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results: LocationData[];
}

export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

export interface WeatherResponse {
  weather: WeatherData;
  location: LocationData;
} 