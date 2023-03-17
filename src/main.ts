import 'zone.js/dist/zone';
import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    importProvidersFrom(RouterModule.forRoot(routes)),
  ],
});
