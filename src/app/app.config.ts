import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, PreloadAllModules, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CustomPreload } from './services/custom-preload';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { routes } from './app.routes';
import { timeInterceptor } from './interceptors/time-interceptor';
import { tokenInterceptor } from './interceptors/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(QuicklinkStrategy)),
    provideHttpClient(withInterceptors([timeInterceptor, tokenInterceptor]))
  ]
};
