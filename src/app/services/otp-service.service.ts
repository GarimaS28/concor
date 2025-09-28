import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private baseUrl = 'http://172.16.4.69:9105/api/sms';

  constructor(private http: HttpClient) {}

  /** Send OTP */
  sendOtp(mobile: string, code: string, purpose: string): Observable<any> {
  console.log("SMS sent");
  const payload = {
    to: mobile,
    code: code,         // dynamically passed
    values: { purpose } // dynamically passed
  };
  return this.http.post<any>(`${this.baseUrl}/send`, payload);
}

  /** Verify OTP */
  verifyOtp(mobile: string, otp: string, validityPeriod: number, hash: string, timestamp: number): Observable<any> {
    const payload = {
      mobile: mobile,
      otp: otp,
      validity_period: validityPeriod,
      hash: hash,
      timestamp: timestamp
    };
    return this.http.post<any>(`${this.baseUrl}/verify`, payload);
  }
}

