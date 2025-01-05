import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { GeocodingResponse, WeatherData, WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly GEOCODING_API = environment.geocodingApiUrl;
  private readonly WEATHER_API = environment.weatherApiUrl;
  private http = inject(HttpClient);

  getWeatherData(city: string): Observable<WeatherResponse> {
    return this.getLocationByCity(city).pipe(
      switchMap(locationResponse => {
        const location = locationResponse.results[0];
        return this.getWeatherByCoordinates(location.latitude, location.longitude).pipe(
          map(weather => ({
            weather,
            location
          }))
        );
      })
    );
  }

  private getLocationByCity(city: string): Observable<GeocodingResponse> {
    return this.http.get<GeocodingResponse>(
      `${this.GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
  }

  private getWeatherByCoordinates(latitude: number, longitude: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`
    );
  }
} 