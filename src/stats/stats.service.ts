import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError,  Observable, of, tap } from 'rxjs';
import { BaseService } from 'src/core/base.service';
import { environment } from 'src/environments/environment';
import { PageStatsResponse } from './models/page-stats-response.model';


import { DeleteResponse } from './models/delete-response.model';
import { SubjectNamesEnum } from 'src/core/subjet-names.enum';
import { removeObjectFromArray } from 'src/core/utils';
import { UserStatsArrayResponse } from './models/user-stats-array-response.model';
import { UserStatsResponse } from './models/user-stats-response.model';


@Injectable({ providedIn: 'root' })
export class StatsService extends BaseService{


  constructor(private http: HttpClient) {super();}

  pageStatsSubject = new BehaviorSubject<PageStatsResponse[]>(null);
  userStatsSubject = new BehaviorSubject<UserStatsResponse[]>(null);

  userStats$ = this.userStatsSubject.asObservable();
  pageStats$ = this.pageStatsSubject.asObservable();


  getAllUserStats(): Observable<UserStatsArrayResponse>{

          return this.http.get<UserStatsArrayResponse>(environment.urls.stats.userStats).pipe(
           
            tap(res=>this.userStatsSubject.next(res.stats)),
            catchError(this.handleHttpError)
          )
  }
  getUserStatsByName(userName: string): Observable<UserStatsArrayResponse> {

      return this.http.post<UserStatsArrayResponse>(environment.urls.stats.getLoginUserStatsByName, {name:userName}).pipe
      (tap(res=>this.userStatsSubject.next(res.stats)),
      catchError(this.handleHttpError)
      )
  }
  
  getSessionsLowerThanFive(){
    return this.http.get<UserStatsArrayResponse>(environment.urls.stats.getSessionsLowerThanFive).pipe
    (tap(res=>this.userStatsSubject.next(res.stats)),
    catchError(this.handleHttpError)
    )
  }

  getPageStats(): Observable<PageStatsResponse[]> {

      return this.http.get<PageStatsResponse[]>(environment.urls.stats.loginPageStats).pipe(
        catchError(this.handleHttpError),
        tap(pageStats=>this.pageStatsSubject.next(pageStats)))

  }

  deletePageStats(id: number): Observable<any> {
    const options = this.getDeleteHttpHeadersOptions(id);

    return this.http.delete<DeleteResponse>(`${environment.urls.stats.loginPageStats}`, options).pipe(
      catchError(this.handleHttpError),
      tap(()=>this.deleteObjectFromSubject(id, SubjectNamesEnum.page)));
  }

  deleteUserStats(id: number): Observable<any> {
    const options = this.getDeleteHttpHeadersOptions(id);
    
    return this.http.delete<DeleteResponse>(environment.urls.stats.userStats, options).pipe(
      catchError(this.handleHttpError),
      tap(()=>this.deleteObjectFromSubject(id, SubjectNamesEnum.user)));
  }

  deleteObjectFromSubject(id:number, subjectName: SubjectNamesEnum){
      let stats;
    
    switch(subjectName){
      case SubjectNamesEnum.page: 
          stats = this.pageStatsSubject.value.slice();
          removeObjectFromArray(id, stats);
        this.pageStatsSubject.next(stats);
      break;
      case   SubjectNamesEnum.user:
         stats = this.userStatsSubject.value.slice();
         removeObjectFromArray(id, stats);
        this.userStatsSubject.next(stats);
    }

  }


}
