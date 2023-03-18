import 'zone.js/dist/zone';
import {  importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AppComponent } from './app/app.component';
import { authInterceptorFn } from './auth/auth-interceptor.function';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptorFn])),
    importProvidersFrom(RouterModule.forRoot(routes)),
  ],
});
