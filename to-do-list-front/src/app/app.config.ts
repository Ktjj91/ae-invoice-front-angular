import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './interceptors/auth/auth.interceptor';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}
export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(
        withInterceptors([authInterceptor])
      ),
      importProvidersFrom(
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:8000'],
          }
        })
      )
    ]
};
