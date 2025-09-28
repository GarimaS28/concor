
// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerDashboardserviceService {
  private apiUrl = 'http://172.16.4.69:9101/salt/srvc'; // <-- replace with actual

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    const body = {
      SRVC: 'CQEBOOKDASHBOARD',
      USER_ID: 'CRIS',
      EBOOKUSER_ID: 'ABCD',
      CHK_FLAG: 'A',
      EQPT_NAME: 'AAAAA7619A'
    };
    return this.http.post<any>(this.apiUrl, body);
  }

  getTreemapData(): Observable<any> {

    const body = {
      SRVC: "CQEBOOKDASHBOARD",
      USER_ID: "CRIS",
      EBOOKUSER_ID: "ABCD",
      CHK_FLAG: "B",
      EQPT_NAME: "AAAAA7619A"
    };

    return this.http.post<any>(this.apiUrl, body);
  }

  getActivitiesData(): Observable<any> {
    const payload = {
      "SRVC": "CQEBOOKDASHBOARD",
      "USER_ID": "CRIS",
      "EBOOKUSER_ID": "ABCD",
      "CHK_FLAG": "D",
      "EQPT_NAME": "AAAAA7619A"
    };

    return this.http.post<any>(this.apiUrl, payload);
  }

  getLoadingData(): Observable<any> {
    const payload = {
      "SRVC": "CQEBOOKDASHBOARD",
      "USER_ID": "CRIS",
      "EBOOKUSER_ID": "ABCD",
      "CHK_FLAG": "E",
      "EQPT_NAME": "AAAAA7619A"
    };

    return this.http.post<any>(this.apiUrl, payload);
  }

}
