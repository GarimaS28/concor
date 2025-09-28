import { Component, inject, ViewChild, ViewChildren, ElementRef, QueryList, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthserviceService } from '../services/authservice.service';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { SessionService } from '../services/session.service';
import { DashboardService } from '../services/dashboard.service';


import { DigitaltokenserviceService } from '../services/digitaltokenservice.service';
import { TokenData } from '../services/tokendata.model';

declare const getPKIData: any;

@Component({
  selector: 'app-login',
  imports: [FormsModule, CaptchaComponent, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild(CaptchaComponent) captchaComponent!: CaptchaComponent;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  
  @Output() closeLogin = new EventEmitter<void>();
  @Output() openForgot = new EventEmitter<void>();

  switchToForgot() {
    this.closeLogin.emit();
    this.openForgot.emit();
  }

  selectedLoginType: 'user' | 'customer' = 'customer';
  showOtpSection: boolean = false;

  loginObj: any = {
    username: '',
    password: '',
    userType: '',
  };
  customerRole: ''|'A' | 'B' | 'C' = 'A';
  //userType: 'superid' | 'terminal' = 'superid';
userType: '' | 'superid' | 'terminal' = '';

  otp: string[] = ['', '', '', '', '', ''];
  otpCorrect: boolean = false;
  otpIncorrect: boolean = false; // New property to track incorrect OTP
  dummyOtp = '123456';

terminalValue: string = '';  // <-- new field


 

  constructor(private router: Router,
            private authService: AuthserviceService,
            private sessionService: SessionService,private DashboardService:DashboardService,
            private digitalTokenService: DigitaltokenserviceService
            ) {}

  closeOverlay() {
    this.closeLogin.emit();
  }

  onLoginTypeChange(type: 'user' | 'customer') {
    this.selectedLoginType = type;
    this.showOtpSection = false; // This line resets the view to the initial login form
  }

 

  // Corrected and combined onOtpChange method
  onOtpChange(index: number, event: any) {
    const value = event.target.value;

    // Reset invalid state when user starts typing again
    this.otpIncorrect = false;

    if (value.length === 1) {
      this.otp[index] = value;
      if (index < 5) {
        this.otpInputs.toArray()[index + 1].nativeElement.focus();
      }
    } else if (value.length === 0) {
      this.otp[index] = '';
    }

    // This logic now checks the OTP and updates the visual state
    const enteredOtp = this.otp.join('');
    if (this.otp.every(digit => digit !== '')) {
      this.otpCorrect = (enteredOtp === this.dummyOtp);
      this.otpIncorrect = !this.otpCorrect;
    } else {
      this.otpCorrect = false;
    }
  }

  onKeyDown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.otp[index] === '' && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  onBack() {
    this.showOtpSection = false;
    this.otp = ['', '', '', '', '', ''];
    // Optional: Clear any error messages or flags
    this.otpCorrect = false;
    this.otpIncorrect = false;
}

loginErrorMessage: string = ''; // for UI binding


async onFinalLogin() {
  this.loginErrorMessage = '';

  if (!this.otpCorrect) {
    this.otpIncorrect = true;
    this.loginErrorMessage = 'Please enter a valid OTP.';
    return;
  }

  // ✅ Commit saved session data after OTP success
  const encryptedData = sessionStorage.getItem('tempSessionData');
  const userData = JSON.parse(sessionStorage.getItem('tempUserData') || '{}');

  if (encryptedData && userData) {
    this.sessionService.setSession(userData, encryptedData);

    if (userData.loginType === 'CUST') {
      this.router.navigate(['/analytics']);
    } else if (userData.loginType === 'USER') {
      this.router.navigate(['/useranalytics']);
    }
  } else {
    this.handleLoginError('Session expired, please login again.');
  }
}


handleLoginError(message: string) {
  this.loginErrorMessage = message;
  console.log("Rishabh" +this.loginErrorMessage);

  // Switch back to login step
  this.showOtpSection = false;

  // Clear fields
  this.loginObj = { username: '', password: '' };
  this.userType = '';
  this.customerRole = '';
  this.otp = ['', '', '', '', '', ''];
}


decryptResponseData(encryptedData: string): string {
  const key = CryptoJS.enc.Utf8.parse('bhGciOiJIUzUxMiJ9eyJpc3MiOiJwaH9'); // AES key
  const iv = CryptoJS.enc.Utf8.parse('n4tqcj69gfh07zpw'); // AES IV

  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return '';
  }
}

decodeJwt(token: string): any {
  try {
    const payloadBase64 = token.split('.')[1]; // take middle part
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')); // Base64URL -> Base64 -> decode
    return JSON.parse(payloadJson);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}



  async onSubmit() {
  this.loginErrorMessage = ''; // reset

  if (this.loginObj.username === 'test' && this.loginObj.password === 'test') {
    console.log("Bypassing captcha for test user...");
    this.showOtpSection = true;
    return;
  }

  // ✅ Validate captcha first
  this.captchaComponent.validateCaptcha();
  if (!this.captchaComponent.isValid) {
    return;
  }

  if (!this.loginObj.username || !this.loginObj.password) {
    console.log('Please enter username and password.');
    return;
  }

  // ✅ Step 1: Call login API here
  const loginTypeToSend = this.selectedLoginType === 'user' ? 'USER' : 'CUST';

    try {
    // 🔐 Step 5: Trigger PKI signing and read token
    const tokenData: any = await this.fetchToken(); // Fetch digital token data
    console.log('🔐 PKI Token Data:', tokenData);

    if (!tokenData?.serialNumber) {
      alert('❌ No digital token found or user cancelled.');
      return;
    }

  this.authService.loginEncrypted(this.loginObj.username, this.loginObj.password, loginTypeToSend)
    .subscribe({
      next: (res: any) => {
        console.log('Login response:', res); 

        if (res.status === 'SUCCESS' && res.data) {
          // decrypt + decode
          const decryptedData = this.decryptResponseData(res.data);
          const userData = this.decodeJwt(decryptedData);

          console.log("Rishabh : "+userData)

          // store basic session info (without routing yet)
          sessionStorage.setItem('tempSessionData', res.data); // keep encrypted data
          sessionStorage.setItem('tempUserData', JSON.stringify(userData));

          // ✅ Step 2: show OTP section only if API login success
          this.showOtpSection = true;
        } else {
          this.handleLoginError(res.message || 'Login failed');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.handleLoginError('Something went wrong, please try again.');
      }
    });
    
     } catch (err) {
    console.error('❌ PKI Error:', err);
    alert('Could not fetch PKI details. Please ensure your PKI token is connected.');
  }
}


captchaValid(): boolean {
  return this.captchaComponent?.isValid === true;
}

proceedLogin() {
  this.showOtpSection = true; // or call API
}

tokenData: TokenData | null = null;
  errorMsg: string = '';

 

  readToken() {
    this.tokenData = null;
    this.errorMsg = '';
    //alert("1234");
    this.digitalTokenService.readTokenData()
      .then(data => this.tokenData = data)
      .catch(err => this.errorMsg = err);
  }

  async fetchToken() {
  return await this.digitalTokenService.readTokenData();
}

}
