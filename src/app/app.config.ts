import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),  provideLottieOptions({
    player: () => import('lottie-web'),
  }), provideHttpClient( withInterceptors([headerInterceptor]))]
};
