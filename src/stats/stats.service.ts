import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PageStatsResponse } from './models/page-stats-response.model';
import { UserStatsResponse } from './models/user-stats-response.model';

@Injectable({ providedIn: 'root' })
export class StatsService {
  pageStatsBackendUrl = 'loginPageStats';
  userStatsBackendUrl = 'loginUserStats';

  constructor(private http: HttpClient) {}

  pageStatsSubject = new BehaviorSubject<PageStatsResponse[]>(null);
  userStatsSubject = new BehaviorSubject<UserStatsResponse[]>(null);

  userStats$ = this.userStatsSubject.asObservable();
  pageStats$ = this.pageStatsSubject.asObservable();

  getUserStatsByName(userName: string): Observable<UserStatsResponse[]> {
    const stats: UserStatsResponse[] = [
      {
        id: 1,
        userId: 1,
        userName: 'gabi',
        sessionInMinutes: 10,
        loginTime: new Date('2023-03-06T03:24:00'),
        logoutTime: new Date('2023-03-06T03:34:00'),
      },
      {
        id: 2,
        userId: 1,
        userName: 'gabi',
        sessionInMinutes: 16,
        loginTime: new Date('2023-03-07T15:04:00'),
        logoutTime: null,
      },
    ];

    if (!this.userStatsSubject.value) {
      this.userStatsSubject.next(stats);
      //return this.http.post<UserStatsResponse[]>(`${this.userStatsBackendUrl}/getOne`, userName).pipe
      //(tap(userStats=>this.userStatsSubject.next(userStats)))
    }
    return this.userStats$;
  }

  getPageStats(): Observable<PageStatsResponse[]> {
    const stats: PageStatsResponse[] = [
      {
        id: 1,
        buttonType: 'Login',
        clickedAfterInSeconds: 13,
        userName: 'gabi',
      },
      {
        id: 2,
        buttonType: 'Login',
        clickedAfterInSeconds: 42,
        userName: 'gabi',
      },
    ];
    if (!this.pageStatsSubject.value) {
      this.pageStatsSubject.next(stats);
      //return this.http.get<UserStatsResponse[]>(`${this.pageStatsBackendUrl}/page`).pipe
      //(tap(pageStats=>this.pageStatsSubject.next(pageStats)))
    }
    return this.pageStats$;
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
    // return this.http.delete(`${this.userStatsBackendUrl}/loginUserStats/${id}`).pipe(
    //tap(()=>{
    //let stats = this.userStatsSubject.value.slice();
    //const index = stats.indexOf(s=>s.id==id);
    //stats.splice(index, 1);
    //this.userStatsSubject.next(stats);
    //})
    // );
    let stats = this.userStatsSubject.value.slice();
    const index = stats.findIndex((s) => s.id == id);
    stats.splice(index, 1);
    this.userStatsSubject.next(stats);
    return of();
  }
}
