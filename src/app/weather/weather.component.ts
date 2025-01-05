import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { WeatherData, LocationData } from '../models/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WeatherComponent {
  cityName: string = '';
  weatherData: WeatherData | null = null;
  locationData: LocationData | null = null;
  error: string | null = null;
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (!this.cityName.trim()) return;
    
    this.isLoading = true;
    this.error = null;
    
    this.weatherService.getWeatherData(this.cityName)
      .subscribe({
        next: (data) => {
          this.weatherData = data.weather;
          this.locationData = data.location;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to fetch weather data';
          this.isLoading = false;
          this.weatherData = null;
          this.locationData = null;
        }
      });
  }

  getWeatherIcon(code: number): string {
    // Map weather codes to Font Awesome classes
    if (code === 0) return 'fa-sun'; // Clear sky
    if (code >= 1 && code <= 3) return 'fa-cloud-sun'; // Partly cloudy
    if (code >= 45 && code <= 48) return 'fa-smog'; // Foggy
    if (code >= 51 && code <= 55) return 'fa-cloud-rain'; // Drizzle
    if (code >= 61 && code <= 65) return 'fa-cloud-showers-heavy'; // Rain
    if (code >= 71 && code <= 77) return 'fa-snowflake'; // Snow
    if (code >= 80 && code <= 82) return 'fa-cloud-rain'; // Rain showers
    if (code >= 85 && code <= 86) return 'fa-snowflake'; // Snow showers
    if (code >= 95 && code <= 99) return 'fa-bolt'; // Thunderstorm
    return 'fa-cloud'; // Default
  }

  getWeatherDescription(code: number): string {
    if (code === 0) return 'Clear sky';
    if (code >= 1 && code <= 3) return 'Partly cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 55) return 'Drizzle';
    if (code >= 61 && code <= 65) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code >= 85 && code <= 86) return 'Snow showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Unknown';
  }
} 