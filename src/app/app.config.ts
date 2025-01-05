import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner, faSearch, faSun, faCloudSun, faCloud, faSmog, faCloudRain, faCloudShowersHeavy, faSnowflake, faBolt, faThermometerHalf, faTint, faWind } from '@fortawesome/free-solid-svg-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    {
      provide: FaIconLibrary,
      useFactory: () => {
        const library = new FaIconLibrary();
        library.addIcons(
          faSpinner, faSearch, faSun, faCloudSun, faCloud, 
          faSmog, faCloudRain, faCloudShowersHeavy, faSnowflake, 
          faBolt, faThermometerHalf, faTint, faWind
        );
        return library;
      }
    }
  ]
};
