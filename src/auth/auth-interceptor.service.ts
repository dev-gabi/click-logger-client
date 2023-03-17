import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<any> {
    const loginData = this.authService.getLoginData();

    if (loginData) {
      const modifiedReq = req.clone({
        headers: req.headers.append(
          'Authorization',
          'Bearer ' + loginData.token
        ),
      });
      return next.handle(modifiedReq);
    }
    return of(req);
  }
}
