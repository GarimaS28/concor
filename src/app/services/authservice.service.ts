import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 
  private apiUrl = 'http://172.16.4.108:9090/user/login'; 
  //private insertapiUrl = 'http://172.16.4.108:9090/user/createCustdetails'; 

  private insertapiUrl = 'http://172.16.4.69:9105/customer/insert';



  

  private key = CryptoJS.enc.Utf8.parse('28CD5B0488AEC6D664F3649A9901225D'); // 32 bytes for AES-256
  private iv = CryptoJS.enc.Utf8.parse('LOP490701417E5G0'); // 16 bytes

  private ApibaseUrl = 'http://172.16.4.69:9101';
  private loginUrl = `${this.ApibaseUrl}/password/verify`;
  private customerInsertUrl = `${this.ApibaseUrl}/customer/insert`;


  constructor(private http: HttpClient, private router: Router) {}

  // LOGIN
  // login(username: string, password: string, usertype: string): Observable<HttpResponse<any>> {
  //   const loginData = {
  //     loginId: username,
  //     loginType: usertype, 
  //     password: password
  //   };

  //   return this.http.post<any>(this.loginUrl, loginData, { observe: 'response' });
  // }

  // loginEncrypted(loginId: string, password: string, loginType: string, serialNumber: string, seriacnNameNumber: string, thumbprint: string, validFrom: string, validTo: string): Observable<any> {
  //   console.log("Rishabh"+loginId+"  "+password+"  "+loginType+ " "+serialNumber);
  //   // Prepare JSON payload
  //   const payload = JSON.stringify({ loginId, loginType, password });

  //   // Encrypt using AES-CBC
  //   const encrypted = CryptoJS.AES.encrypt(payload, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

  //   const requestBody = {
  //     requestBody: encrypted.toString() // base64 encoded
  //   };

  //   return this.http.post(this.apiUrl, requestBody);
  // }

  loginEncrypted(loginId: string, password: string, loginType: string): Observable<any> {
    console.log("Rishabh"+loginId+"  "+password+"  "+loginType+ " ");
    // Prepare JSON payload
    const payload = JSON.stringify({ loginId, loginType, password });

    // Encrypt using AES-CBC
    const encrypted = CryptoJS.AES.encrypt(payload, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    const requestBody = {
      requestBody: encrypted.toString() // base64 encoded
    };

    return this.http.post(this.apiUrl, requestBody);
  }

  // FORM SUBMISSION
  
  // submitCustomerForm(data: any) {
  //   const headers = { 'Content-Type': 'application/json' };
  //   return this.http.post(this.insertapiUrl, data, { headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   responseType: 'text' });
  // }

  submitCustomerForm(data: any) {
  return this.http.post(this.insertapiUrl, data, {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'text' // get raw string
  }).pipe(
    map((raw: string) => {
      // Try to extract the JSON part
      try {
        const match = raw.match(/{.*}/); // extract {...}
        return match ? JSON.parse(match[0]) : {};
      } catch (e) {
        console.error('❌ Failed to parse response:', raw);
        return {};
      }
    })
  );
}


  fetchCustomer(rqstId: string) {
    const payload = { p_rqstid: rqstId };
    const url = `${this.ApibaseUrl}/customer/fetch`;
    return this.http.post(url, payload);
  }

  
  

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('concorUser');
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
