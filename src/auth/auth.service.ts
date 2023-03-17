import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, tap } from 'rxjs';
import { LoginRequest } from './models/login-request.model';
import { LoginResponse } from './models/login-response.model';
import { LogoutRequest } from './models/logout-request.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  private localStorageSessionKey = '_sk';
  private backendUrl: string = '';
  private isUser = new BehaviorSubject<boolean>(false);
  public isUser$ = this.isUser.asObservable();

  login(request: LoginRequest): Observable<LoginResponse> {
    this.isUser.next(true);
    //  return this.http.post<LoginResponse>(`${this.backendUrl}/login`, request).pipe(
    //   tap(res=>{
    // localStorage.setItem(this.localStorageSessionKey, JSON.stringify(res));
    //    })

    //);
    let res: LoginResponse = {
      //TODO: DELETE
      userName: 'bob',
      jobTitle: 'schnider',
      loginPageStatsId: 3,
      token: '',
    };
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(res));
    return of(res);
  }

  logout() {
    this.isUser.next(false);
    localStorage.removeItem(this.localStorageSessionKey);

    //const loginData  =this.GetLoginData();
    //const req : LogoutRequest = {
    // loginPageStatsId:loginData.loginPageStatsId,
    //  token: loginData.token
    //};
    //return this.http.post<LogoutResponse>(`${this.backendUrl}/logout, req`);
    return of('');
  }

  getLoginData(): LoginResponse {
    const data: LoginResponse = JSON.parse(
      localStorage.getItem(this.localStorageSessionKey)
    );

    return data;
  }
}
