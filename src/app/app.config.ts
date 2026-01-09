import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Providers generales y de rendimiento:
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    // provideClientHydration(withEventReplay()),
    
    // Providers funcionales:
    provideRouter(routes), 
    provideAnimations(),     
    // Llama a provideHttpClient con withFetch() para optimizar el rendimiento de SSR
    provideHttpClient(withFetch())   
  ]
};