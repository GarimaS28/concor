
import { Injectable } from '@angular/core';
import { TokenData } from './tokendata.model';

declare const callSignData: any;

@Injectable({
  providedIn: 'root'
})
export class DigitaltokenserviceService {

  constructor() {}

  readTokenData(): Promise<TokenData> {
    return new Promise((resolve, reject) => {
      try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const formattedDate = `${dd}/${mm}/${yyyy}`;

        // Trigger PKI component
        callSignData("Test message", formattedDate);

        setTimeout(() => {
          const serialNumber = (document.getElementById("f_srnumb") as HTMLInputElement)?.value;
          const cnName = (document.getElementById("f_cname") as HTMLInputElement)?.value;
          const thumbprint = (document.getElementById("f_thumbp") as HTMLInputElement)?.value;
          const validFrom = (document.getElementById("f_VldFrom") as HTMLInputElement)?.value;
          const validTo = (document.getElementById("f_VldUpto") as HTMLInputElement)?.value;

          if (!serialNumber || !cnName || !thumbprint) {
            reject('❌ No digital token found or user cancelled.');
          } else {
            const token: TokenData = { serialNumber, cnName, thumbprint, validFrom, validTo };
            this.writeTokenToHiddenFields(token); // keep DOM values in sync
            resolve(token);
          }
        }, 1000); // give PKI time to fill inputs
      } catch (err) {
        reject('Error invoking PKI component: ' + err);
      }
    });
  }

  private writeTokenToHiddenFields(token: TokenData) {
    (document.getElementById("f_srnumb") as HTMLInputElement).value = token.serialNumber;
    (document.getElementById("f_cname") as HTMLInputElement).value = token.cnName;
    (document.getElementById("f_thumbp") as HTMLInputElement).value = token.thumbprint;
    (document.getElementById("f_VldFrom") as HTMLInputElement).value = token.validFrom;
    (document.getElementById("f_VldUpto") as HTMLInputElement).value = token.validTo;
  }
}


