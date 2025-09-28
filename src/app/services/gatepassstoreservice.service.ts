import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GatepassstoreserviceService {

  private gatePassData: any = null;

  setGatePassData(data: any) {
    this.gatePassData = data;
  }

  getGatePassData() {
    return this.gatePassData;
  }

  clear() {
    this.gatePassData = null;
  }
}
