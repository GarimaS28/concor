// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerDashboardserviceService {
 
  private baseUrl= 'http://172.16.4.90:9105/UserDash/ActiveCustomer';

  private totalbookingURL='http://172.16.4.90:9105/UserDash/TotalBooking';
  private taskperfURL='http://172.16.4.90:9105/UserDash/TaskPerf';
  private invntfURL='http://172.16.4.90:9105/UserDash/CntrInvt';
  private forweekURL='http://172.16.4.90:9105/UserDash/LastFourWeekColl';

  private noOfBooking = 'http://172.16.4.90:9105/UserDash/NoOfEBooking';
  private actvCustomers = 'http://172.16.4.90:9105/UserDash/ActiveCustomer';
  private makerchecker = 'http://172.16.4.90:9105/UserDash/MakerCheckerStatus';


  constructor(private http: HttpClient) {}

  getData(payload: any): Observable<any> {
    return this.http.post<any>(this.noOfBooking, payload);
  }
  
  

  getDashboardBookingData(): Observable<any> {
    var trmncode='TICD';
    const payload = { p_trmncode: trmncode };
    return this.http.post(this.totalbookingURL, payload);
  }

  getTaskPerformance(): Observable<any> {
    var trmncode='TICD';
  const payload = { p_trmncode: trmncode };
  return this.http.post(this.taskperfURL, payload);
}

getContainerInventory(): Observable<any> {
  var trmncode='TICD';
  const payload = { p_trmncode: trmncode };
  return this.http.post(this.invntfURL, payload);
}

getLastFourWeekCollection(): Observable<any> {
  var trmncode='TICD';
  const payload = { p_trmncode: trmncode };
  return this.http.post(this.forweekURL, payload);
}

getactiveData(payload: any): Observable<any> {
    return this.http.post<any>(this.actvCustomers, payload);
  }

  
getMakerCheckerData(payload: any): Observable<any> {
    return this.http.post<any>(this.makerchecker, payload);
  }




  

  
  

 

}

