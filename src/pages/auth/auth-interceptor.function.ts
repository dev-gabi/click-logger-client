import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const loginData = authService.getLoginData();

    if (loginData) {

      const modifiedReq = req.clone({
        headers: req.headers.append(
          'Authorization',
          'Bearer ' + loginData.token
        ),
      });
      return next(modifiedReq);
    }
    return next(req);
  }


