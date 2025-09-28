import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  private apiUrl = 'http://172.16.4.69:9102/help/getHelp';
  private apiurlTUX='http://172.16.4.69:9102/salt/srvc';



  private cacheKeyCmdt = 'helpDataCache_CMDT_CODE';
  private cacheKeyConsigner = 'helpDataCache_CNSR_CUST_CODE';
  private cacheKeyConsignee = 'helpDataCache_CNSE_CUST_CODE';
  private cacheKeyCustId = 'helpDataCache_CUST_ID';
  private cacheKeyTrmnlCode = 'helpDataCache_TRMNL_CODE';
  private cacheKeyTrmnlCodeTo = 'helpDataCache_TRMNL_CODE_TO';
  private cacheKeyBusnsType = 'helpDataCache_BSNS_TYPE';
  private cacheKeyState = 'helpDataCache_STATE';
  private cacheKeyCtnrType = 'helpDataCache_CTNR_TYPE';
  private cacheKeyPickupDlvr = 'helpDataCache_Pickup_Dlvr';

  private getFromCache(key: string): any | null {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    return parsed.data;
  } catch {
    localStorage.removeItem(key); // fallback cleanup for bad JSON
    return null;
  }
}


  private setToCache(key: string, data: any): void {
  const current = this.getFromCache(key); // no expiry check anymore
  if (current && Array.isArray(current) && Array.isArray(data)) {
    if (current.length === data.length) return; // same length, skip write
  }

  const payload = {
    data,
    timestamp: new Date().getTime()
  };
  localStorage.setItem(key, JSON.stringify(payload));
}


  private helpDataSubject = new BehaviorSubject<any>(null);
  helpData$ = this.helpDataSubject.asObservable();

  private TrmnlCodeSubject = new BehaviorSubject<any>(null);
  TrmnlCode$ = this.TrmnlCodeSubject.asObservable();

  private TrmnlCodeToSubject = new BehaviorSubject<any>(null);
  TrmnlCodeTo$ = this.TrmnlCodeToSubject.asObservable();

  private StateSubject = new BehaviorSubject<any>(null);
  state$ = this.StateSubject.asObservable();

  private BusnsTypeSubject = new BehaviorSubject<any>(null);
  BusnsType$ = this.BusnsTypeSubject.asObservable();

  private CtnrTypeSubject = new BehaviorSubject<any>(null);
  CtnrType$ = this.CtnrTypeSubject.asObservable();

  private cnsrcustomerDataSubject = new BehaviorSubject<any>(null);
  cnsrcustomerData$ = this.cnsrcustomerDataSubject.asObservable();

  private cnsecustomerDataSubject = new BehaviorSubject<any>(null);
  cnsecustomerData$ = this.cnsecustomerDataSubject.asObservable();

  private custIdDataSubject = new BehaviorSubject<any>(null);
  custIdData$ = this.custIdDataSubject.asObservable();
  
  private PickupDlvrDataSubject = new BehaviorSubject<any>(null);
  PickupDlvrData$ = this.PickupDlvrDataSubject.asObservable();

  constructor(private http: HttpClient) {
    const cachedCmdtData = this.getFromCache(this.cacheKeyCmdt);
    if (cachedCmdtData) this.helpDataSubject.next(cachedCmdtData);

    const cachedTrmnlData = this.getFromCache(this.cacheKeyTrmnlCode);
    if (cachedTrmnlData) this.TrmnlCodeSubject.next(cachedTrmnlData);

    const cachedTrmnlToData = this.getFromCache(this.cacheKeyTrmnlCodeTo);
    if (cachedTrmnlToData) this.TrmnlCodeToSubject.next(cachedTrmnlToData);

    const cachedCtnrType = this.getFromCache(this.cacheKeyCtnrType);
    if (cachedCtnrType) this.CtnrTypeSubject.next(cachedCtnrType);

    const cachedState = this.getFromCache(this.cacheKeyState);
    if (cachedState) this.StateSubject.next(cachedState);

    const cachedBusnsType = this.getFromCache(this.cacheKeyBusnsType);
    if (cachedBusnsType) this.BusnsTypeSubject.next(cachedBusnsType);

    const cachedcnsrcustomerData = this.getFromCache(this.cacheKeyConsigner);
    if (cachedcnsrcustomerData) this.cnsrcustomerDataSubject.next(cachedcnsrcustomerData);

    const cachedcnsecustomerData = this.getFromCache(this.cacheKeyConsignee);
    if (cachedcnsecustomerData) this.cnsecustomerDataSubject.next(cachedcnsecustomerData);

    const cachedCustIdData = this.getFromCache(this.cacheKeyCustId);
    if (cachedCustIdData) this.custIdDataSubject.next(cachedCustIdData);
    
    const cachedPickupDlvrData = this.getFromCache(this.cacheKeyPickupDlvr);
    if (cachedPickupDlvrData) this.PickupDlvrDataSubject.next(cachedPickupDlvrData);
  }

 getHelpDataa(): Observable<any> {
  const cacheKey = `${this.cacheKeyCmdt}`;
  const cachedData = this.getFromCache(cacheKey);
  
  if (cachedData) {
    this.helpDataSubject.next(cachedData);
    //console.log('Returning help data from memory cache.');
    return of(cachedData);
  }

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = {
    SRVC: 'CVPOPGLBLARR',
    TAG:'CMDTCODE'
  };


  return this.http.post(this.apiurlTUX, body, { headers }).pipe(
    tap(data => {
      //console.log('Fetched help data from API.');
      this.helpDataSubject.next(data);
      this.setToCache(cacheKey, data);
    })
  );
}

getHelpData(): Observable<any> {
  const cacheKey = `${this.cacheKeyCmdt}`;
  const cachedData = this.getFromCache(cacheKey);

  if (cachedData) {
    this.helpDataSubject.next(cachedData);
    //console.log('Returning help data from memory cache.');
    return of(cachedData);
  }

  // Your hardcoded data object
  const hardcodedData = {
    "result": [
      {"p_CmdtType":"M","p_CmdtCode":"ATTA","p_HzdsFlag":"N","p_CmdtDesc":"ATTA"},
      {"p_CmdtType":"M","p_CmdtCode":"BAJR","p_HzdsFlag":"N","p_CmdtDesc":"BAJRA"},
      {"p_CmdtType":"M","p_CmdtCode":"BEAN","p_HzdsFlag":"N","p_CmdtDesc":"BEANS"},
      {"p_CmdtType":"M","p_CmdtCode":"BESN","p_HzdsFlag":"N","p_CmdtDesc":"BESAN"},
      {"p_CmdtType":"M","p_CmdtCode":"BKMT","p_HzdsFlag":"N","p_CmdtDesc":"BLACK MATPE"},
      // ... (rest of your data)
      {"p_CmdtType":"M","p_CmdtCode":"SOCR","p_HzdsFlag":"N","p_CmdtDesc":"SODIUM BI CARBONATE"}
    ]
  };

  // Store the hardcoded data in the cache and notify subscribers
  this.helpDataSubject.next(hardcodedData);
  this.setToCache(cacheKey, hardcodedData);
  //console.log('Returning hardcoded help data and caching it.');

  // Return as observable
  return of(hardcodedData);
}


  getTerminalCode(): Observable<any> {
    const cachedData = this.getFromCache(this.cacheKeyTrmnlCode);
    if (cachedData) {
      this.TrmnlCodeSubject.next(cachedData);
      //console.log('Returning Terminal data from memory cache.');
      return of(cachedData);
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { HELP_TAG: 'TRMN_CODE_EBOOK' };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap(data => {
        //console.log('Fetched Terminal from API.');
        this.TrmnlCodeSubject.next(data);
        this.setToCache(this.cacheKeyTrmnlCode, data);
      })
    );
  }/*********** wait ******** */

  getTerminalCodeTo(): Observable<any> {
    const cachedData = this.getFromCache(this.cacheKeyTrmnlCodeTo);
    if (cachedData) {
      this.TrmnlCodeToSubject.next(cachedData);
      //console.log('Returning Terminal data from memory cache.');
      return of(cachedData);
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { HELP_TAG: 'TRMN_CODE' };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap(data => {
        //console.log('Fetched Terminal from API.');
        this.TrmnlCodeToSubject.next(data);
        this.setToCache(this.cacheKeyTrmnlCodeTo, data);
      })
    );
  }

  getState(): Observable<any> {
    const cachedData = this.getFromCache(this.cacheKeyState);
    if (cachedData) {
      this.StateSubject.next(cachedData);
      //console.log('Returning State data from memory cache.');
      return of(cachedData);
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { HELP_TAG: 'STATE' };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap(data => {
        //console.log('Fetched State from API.');
        this.StateSubject.next(data);
        this.setToCache(this.cacheKeyState, data);
      })
    );
  }

  getCtnrType(): Observable<any> {
    const cachedData = this.getFromCache(this.cacheKeyCtnrType);
    if (cachedData) {
      this.CtnrTypeSubject.next(cachedData);
      //console.log('Returning Ctnr Type from memory cache.');
      return of(cachedData);
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { HELP_TAG: 'CNTR_TYPE' };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap(data => {
        //console.log('Fetched Ctnr Type from API.');
        this.CtnrTypeSubject.next(data);
        this.setToCache(this.cacheKeyCtnrType, data);
      })
    );
  }

  getBussinesssType(): Observable<any> {
    const cachedData = this.getFromCache(this.cacheKeyBusnsType);
    if (cachedData) {
      this.BusnsTypeSubject.next(cachedData);
      //console.log('Returning Business Type from memory cache.');
      return of(cachedData);
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { HELP_TAG: 'BUSSINESS_TYPE' };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap(data => {
        //console.log('Fetched Business Type from API.');
        this.BusnsTypeSubject.next(data);
        this.setToCache(this.cacheKeyBusnsType, data);
      })
    );
  }

  getConsignerHelpData(stationCode: string): Observable<any> {
  const cacheKey = this.cacheKeyConsigner + '_' + stationCode;
  const cachedData = this.getFromCache(cacheKey);

  if (cachedData) {
    this.cnsrcustomerDataSubject.next(cachedData);
    //console.log('Returning consigner data from memory cache for:', stationCode);
    return of(cachedData);
  }

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = {
    HELP_TAG: 'CNSR_CODE',
    p_TrmnCode: stationCode
  };

  return this.http.post(this.apiUrl, body, { headers }).pipe(
    tap(data => {
      if (data) {
        //console.log('Fetched consigner help data from API for:', stationCode);
        this.cnsrcustomerDataSubject.next(data);
        this.setToCache(cacheKey, data);
      } else {
        console.warn('API returned empty or invalid consigner data for:', stationCode);
      }
    })
  );
}

getConsigneeHelpData(stationCode: string): Observable<any> {
  const cacheKey = this.cacheKeyConsignee + '_' + stationCode;
  const cachedData = this.getFromCache(cacheKey);

  if (cachedData) {
    this.cnsecustomerDataSubject.next(cachedData);
    //console.log('Returning consigner data from memory cache for:', stationCode);
    return of(cachedData);
  }

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = {
    HELP_TAG: 'CNSE_CODE',
    p_TrmnCode: stationCode
  };

  return this.http.post(this.apiUrl, body, { headers }).pipe(
    tap(data => {
      if (data) {
        //console.log('Fetched consigner help data from API for:', stationCode);
        this.cnsecustomerDataSubject.next(data);
        this.setToCache(cacheKey, data);
      } else {
        console.warn('API returned empty or invalid consigner data for:', stationCode);
      }
    })
  );
}




  getCustomerIdHelpData(CustCode: string, TrmnCode: string): Observable<any> {
  const cacheKey = `${this.cacheKeyCustId}_${CustCode}_${TrmnCode}`;
  const cachedData = this.getFromCache(cacheKey);

  if (cachedData) {
    this.custIdDataSubject.next(cachedData);
    //console.log('Returning CUST_ID data from memory cache.');
    return of(cachedData);
  }

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = {
    HELP_TAG: 'CUST_ID',
    p_CustCode:CustCode,
    p_TrmnCode:TrmnCode
  };

  return this.http.post(this.apiUrl, body, { headers }).pipe(
    tap(data => {
      //console.log('Fetched CUST_ID data from API.');
      this.custIdDataSubject.next(data);
      this.setToCache(cacheKey, data);
    })
  );
}

getpickupDlvrData(TrmnCode: string): Observable<any> {
  const cacheKey = `${this.cacheKeyPickupDlvr}_${TrmnCode}`;
  const cachedData = this.getFromCache(cacheKey);

  if (cachedData) {
    this.PickupDlvrDataSubject.next(cachedData);
    console.log('Returning PICK_DLVR_PT data from memory cache.');
    return of(cachedData);
  }

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = {
    HELP_TAG: 'PICK_DLVR_PT',
    p_sttn:TrmnCode
  };

  return this.http.post(this.apiUrl, body, { headers }).pipe(
    tap(data => {
      console.log('Fetched PICK_DLVR_PT data from API.');
      this.PickupDlvrDataSubject.next(data);
      this.setToCache(cacheKey, data);
    })
  );
}


  
}
