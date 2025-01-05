import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  geocodingApiUrl: 'https://geocoding-api.open-meteo.com/v1/search',
  weatherApiUrl: 'https://api.open-meteo.com/v1/forecast'
}; 