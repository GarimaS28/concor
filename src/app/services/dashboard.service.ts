import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://172.16.4.108:9090/ebook';
  
  private detailUrl = 'http://172.16.4.108:9090/ebook';
  private dashboardDataSubject = new BehaviorSubject<any>(null);
  dashboardData$ = this.dashboardDataSubject.asObservable();

  constructor(private http: HttpClient) {}


  fetchData(): Observable<any> {
    // POST call with empty body
    return this.http.post(`${this.baseUrl}/fetch`, {});
  }

  fetchByReqId(davRqstId: string): Observable<any> {
    return this.http.post(`${this.detailUrl}/fetchByReqId?davRqstId=${davRqstId}`,{});
  }

  // fetchDashboard(payload: any = {}): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/fetch`, payload).pipe(
  //     tap(response => console.log('API Raw Response:', response)),
  //     catchError(err => {
  //       console.error('API Error:', err);
  //       return throwError(() => new Error('Failed to fetch dashboard data'));
  //     })
  //   );
  // }

  // loadDashboard(payload: any = {}): void {
  //   console.log('📡 Calling Dashboard API (POST) with payload:', payload);
  //   this.fetchDashboard(payload).subscribe({
  //     next: (data) => {
  //       console.log('✅ Dashboard API Response:', data);
  //       this.dashboardDataSubject.next(data);
  //     },
  //     error: (err) => {
  //       console.error('❌ Dashboard API failed:', err);
  //       this.dashboardDataSubject.next({ data: [] });
  //     }
  //   });
  // }

  // get dashboardData(): any {
  //   return this.dashboardDataSubject.value;
  // }

  // fetchByRequestId(reqId: string): Observable<any> {
  //   const url = `${this.baseUrl}/fetchByReqId?davRqstId=${reqId}`;
  //   return this.http.post(url, {}).pipe(
  //     tap(response => console.log('FetchByRequestId Response:', response)),
  //     catchError(err => {
  //       console.error('FetchByRequestId Error:', err);
  //       return throwError(() => new Error('Failed to fetch request by ID'));
  //     })
  //   );
  // }
}