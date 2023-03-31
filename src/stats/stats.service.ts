import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, of, tap } from 'rxjs';
import { BaseService } from 'src/base.service';
import { environment } from 'src/environments/environment';
import { PageStatsResponse } from './models/page-stats-response.model';
import { UserStatsResponse } from './models/user-stats-response.model';
import { UserStats } from './models/user-stats.model';

@Injectable({ providedIn: 'root' })
export class StatsService extends BaseService{


  constructor(private http: HttpClient) {super();}

  pageStatsSubject = new BehaviorSubject<PageStatsResponse[]>(null);
  userStatsSubject = new BehaviorSubject<UserStats[]>(null);

  userStats$ = this.userStatsSubject.asObservable();
  pageStats$ = this.pageStatsSubject.asObservable();
//TODO: delete methods

  getAllUserStats(): Observable<UserStatsResponse>{

          return this.http.get<UserStatsResponse>(environment.urls.stats.userStats).pipe(
           
            tap(res=>this.userStatsSubject.next(res.stats)),
            catchError(this.handleHttpError)
          )
  }
  getUserStatsByName(userName: string): Observable<UserStatsResponse> {

      return this.http.post<UserStatsResponse>(environment.urls.stats.getLoginUserStatsByName, {name:userName}).pipe
      (tap(res=>this.userStatsSubject.next(res.stats)),
      catchError(this.handleHttpError)
      )
  }
  
  getSessionsLowerThanFive(){
    return this.http.get<UserStatsResponse>(environment.urls.stats.getSessionsLowerThanFive).pipe
    (tap(res=>this.userStatsSubject.next(res.stats)),
    catchError(this.handleHttpError)
    )
  }

  getPageStats(): Observable<PageStatsResponse[]> {

      return this.http.get<PageStatsResponse[]>(environment.urls.stats.getLoginPageStats).pipe
      (tap(pageStats=>this.pageStatsSubject.next(pageStats)))

  }

  deletePageStats(id: number): Observable<any> {
    // return this.http.delete(`${this.pageStatsBackendUrl}/loginPageStats/${id}`).pipe(
    //tap(()=>{
    //let stats = this.pageStatsSubject.value.slice();
    //const index = stats.indexOf(s=>s.id==id);
    //stats.splice(index, 1);
    //this.pageStatsSubject.next(stats);
    //})
    // );
    let stats = this.pageStatsSubject.value.slice();
    const index = stats.findIndex((s) => s.id == id);
    stats.splice(index, 1);
    this.pageStatsSubject.next(stats);
    return of();
  }

  deleteUserStats(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      },
    };
    
    return this.http.delete(environment.urls.stats.userStats, options).pipe(
    tap(()=>{
    let stats = this.userStatsSubject.value.slice();
    const index = stats.findIndex(s=>s.id==id);
    stats.splice(index, 1);
    this.userStatsSubject.next(stats);
    })
    );

  }
}
