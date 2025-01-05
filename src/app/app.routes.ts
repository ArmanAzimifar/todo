import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'weather', component: WeatherComponent }
];
