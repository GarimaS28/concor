import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private loginIdKey = 'loginId';
  private loginTypeKey = 'loginType';
  private expKey = 'exp';
  private makerCheckerKey = 'makerCheckerFlag';
  private tokenKey = 'authToken';

  constructor() { }

  // Save session data
  setSession(userData: any,token:string) {
  sessionStorage.setItem(this.loginIdKey, userData.loginId);
  sessionStorage.setItem(this.loginTypeKey, userData.loginType);
  sessionStorage.setItem(this.expKey, userData.exp.toString());
  sessionStorage.setItem(this.tokenKey, token);

  // Only set makerCheckerFlag for USER
  if (userData.loginType === 'USER' && userData.makerCheckerFlag) {
    sessionStorage.setItem(this.makerCheckerKey, userData.makerCheckerFlag);
  } else {
    sessionStorage.removeItem(this.makerCheckerKey); // Ensure it's cleared for CUST
  }
}


  // Get session data
  get loginId(): string | null {
    return sessionStorage.getItem(this.loginIdKey);
  }

  get loginType(): string | null {
    return sessionStorage.getItem(this.loginTypeKey);
  }

  get exp(): number | null {
    const val = sessionStorage.getItem(this.expKey);
    return val ? +val : null;
  }

  get makerCheckerFlag(): string | null {
    return sessionStorage.getItem(this.makerCheckerKey);
  }

  get token(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Clear session
  clearSession() {
    sessionStorage.removeItem(this.loginIdKey);
    sessionStorage.removeItem(this.loginTypeKey);
    sessionStorage.removeItem(this.expKey);
    sessionStorage.removeItem(this.makerCheckerKey);
  }
}
