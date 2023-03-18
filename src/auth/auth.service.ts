import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from './models/api-response.model';
import { LoginRequest } from './models/login-request.model';
import { LoginResponse } from './models/login-response.model';
import { User } from './models/user.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}
//TODO: auto login 
  private localStorageSessionKey = '_sk';
  private isUser = new BehaviorSubject<boolean>(false);
  public isUser$ = this.isUser.asObservable();

  login(request: LoginRequest): Observable<LoginResponse> {
    
     return this.http.post<LoginResponse>(environment.urls.auth.login, request).pipe(
      tap(res=>{
        this.isUser.next(true);
        this.setUsertoLocalStorage(res);
      
       }),
       catchError(this.handleHttpError)
    );
  }

  logout() {

    return this.http.post(environment.urls.auth.logout, null).pipe(
      tap(()=>{
        this.isUser.next(false);
        localStorage.removeItem(this.localStorageSessionKey);
      }),
      catchError(this.handleHttpError)
    );  
  }

  getLoginData(): LoginResponse {
    const data: LoginResponse = JSON.parse(
      localStorage.getItem(this.localStorageSessionKey)
    );

    return data;
  }
  
  protected handleHttpError = (response: HttpErrorResponse) =>
  {

    let error: string = "";
    if (response.status == 0) {
      error = "A Network Error Has Occured, please notify the site's webmaster";
    }

    else if (response.error?.errors) {

      if (response.error.errors?.Email) {
        response.error.errors.Email.map((er: string) => error += " " + er + " .");
      }
      if (response.error.errors?.Password) {
        response.error.errors.Password.map((er: string) => error += " " + er );
      }

      if (Array.isArray(response.error?.errors)) {
        response.error.errors.map((er: string) => error += " " + er + " .");
      } 
    }
    else if (response.error?.detail) {
      error += response.error?.detail;
    }
    else {
      error = response.message;
    }

    return throwError(()=>new Error(error));
  }
  setUsertoLocalStorage(res: LoginResponse) {

    const user : User = {
      token: res.token,
      userName: res.userName,
      userId:res.userId,
      loginUserStatsId:res.loginUserStatsId
    };
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(user));
  
  }
}


