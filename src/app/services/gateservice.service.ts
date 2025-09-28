import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class GateserviceService {
  private ApibaseUrl = 'http://172.16.4.69:9105/salt/srvc';
  private customerInsertUrl = `${this.ApibaseUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  submitGatePassForm(data: any) {
  console.log("Submitting gate Pass ", data);
  return this.http.post(this.customerInsertUrl, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

submitJobOrdrForm(data: any) {
  console.log("Submitting job order ", data);
  return this.http.post(this.customerInsertUrl, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

submitallotmentForm(data: any) {
  console.log("Submitting Allotment ", data);
  return this.http.post(this.customerInsertUrl, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

fetchGatePassForm(data: any) {
  console.log("fetching gate Pass ", data);
  return this.http.post(this.customerInsertUrl, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

fetchJobOrderForm(data: any) {
  console.log("fetching Job Order ", data);
  return this.http.post(this.customerInsertUrl, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

getContainerCharges(payload: any): Observable<any> {
  const url = 'http://172.16.4.69:9105/indent/getCntrRegnCharges';
  console.log('Fetching container charges with payload:', payload);
  return this.http.post<any>(url, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}


}
