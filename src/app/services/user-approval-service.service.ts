import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApprovalServiceService {
  private apiUrl = 'http://172.16.4.108:9090/ebook/UpdateDexEcustRqstStatus';

  constructor(private http: HttpClient) {}

  forwardRequest(davRqstId: string): Observable<any> {
    const payload = {
      davRqstId,
      davStatus: 'FRWD'
    };

    return this.http.post<any>(this.apiUrl, payload); // ✅ Interceptor will attach headers
  }

  approvedRequest(davRqstId: string): Observable<any> {
    const payload = {
      davRqstId,
      davStatus: 'APRV'
    };

    return this.http.post<any>(this.apiUrl, payload); // ✅ Interceptor will attach headers
  }

  rejectedRequest(davRqstId: string): Observable<any> {
    const payload = {
      davRqstId,
      davStatus: 'CNCL'
    };

    return this.http.post<any>(this.apiUrl, payload); // ✅ Interceptor will attach headers
  }
}
