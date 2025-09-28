import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateserviceService {

  private baseUrl = 'http://172.16.4.69:9101';

  constructor(private http:HttpClient) { }

  getStates(){
    const url="http://localhost:3000/states"
    
    return this.http.get(url);
  }

  getUnionTerr(){
    const url="http://localhost:3000/territories"
    
    return this.http.get(url);
  }

  getstatecities(){
    const url="http://localhost:3000/statesWithCities"
    
    return this.http.get(url);
  }

  fetchCustomerbyRqid(rqstid: any) {
    const url = `${this.baseUrl}/customer/fetch`;
    return this.http.post(url, { rqstid });
  }

  getHelp(HELP_TAG: string, P_CUSTCODE: string, P_TRMNCODE: string) {
    const url = `${this.baseUrl}/help/getHelp`;
    const requestBody = { HELP_TAG, P_CUSTCODE, P_TRMNCODE };

    return this.http.post(url, requestBody);
  }

  

  
}
