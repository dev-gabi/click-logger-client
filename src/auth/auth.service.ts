import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  BehaviorSubject, tap, catchError } from 'rxjs';
import { BaseService } from 'src/base.service';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './models/login-request.model';
import { LoginResponse } from './models/login-response.model';
import { User } from './models/user.model';


@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService{

  constructor(private http: HttpClient) {super();}
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


