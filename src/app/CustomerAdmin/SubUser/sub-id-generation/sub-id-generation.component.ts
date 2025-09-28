  
import { Component,  OnInit, ViewChild,ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormArray, FormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { GateserviceService } from 'src/app/services/gateservice.service';
// import { FormValidationService } from 'src/app/services/form-validation.service';
// import { DateServiceService } from 'src/app/shared/Date/date-service.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LoaderComponent } from 'src/app/theme/shared/components/loader/loader.component';



     interface ContainerInfo {
  ALOTctnrNo: string;
  ALOTctnrSize: string;
  ALOTctnrType: string;
  ALOTctnrOwnd?: string;
}

       
       @Component({
         selector: 'app-sub-id-generation',
         standalone: true,
         imports: [SharedModule, FormsModule],
         templateUrl: './sub-id-generation.component.html',
         styleUrls: ['./sub-id-generation.component.scss'],
         animations: [
           trigger('fadeIn', [
             transition(':enter', [
               style({ opacity: 0 }),
               animate('300ms ease-in', style({ opacity: 1 })),
             ]),
           ]),
         ]
       })
       export class SubIdGenerationComponent  {
        
     
  form: FormGroup;
  submitted = false;

  // OTP state
  mobileVerified = false;
  emailVerified = false;
  showMobileOtpInput = false;
  showEmailOtpInput = false;

  // Dynamic entries
  subIds: string[] = [];
  unfilledFields: string[] = [];
  terminalEntries = [{ terminal: '', custCode: '', jv: '' }];
  taskEntries = [{ task: '', description: '' }];

  constructor(private fb: FormBuilder) {
    const currentDate = new Date().toISOString().split('T')[0];

    this.form = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      middleName: ['', [
        Validators.pattern(/^[a-zA-Z ]*$/),
        Validators.maxLength(30)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]],
      designation: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      validFrom: [currentDate, Validators.required],
      validTo: ['', Validators.required],
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      pan: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
      ]],
        restrictPanInput: [''] ,
      mobileOtp: [''],
      emailOtp: ['']
    }, {
      //validators: [validDateRangeValidator()]
    });

    this.trackUnfilledFields();
  }

  // Easy getter for form controls
  get f() {
    return this.form.controls;
  }
restrictPanInput(event: any) {
  const value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  this.form.get('pan')?.setValue(value, { emitEvent: false });
}
isLoading: boolean = true;

  // Track unfilled fields
  trackUnfilledFields() {
    this.form.valueChanges.subscribe(() => {
      this.unfilledFields = Object.keys(this.form.controls).filter(
        key => this.form.get(key)?.invalid
      );
    });

    this.unfilledFields = Object.keys(this.form.controls).filter(
      key => this.form.get(key)?.invalid
    );
  }
allowOnlyLetters(event: KeyboardEvent): boolean {
  const charCode = event.key.charCodeAt(0);
  
  // Allow only letters (A-Z, a-z), space, and backspace
  if ((charCode >= 65 && charCode <= 90) ||   // A-Z
      (charCode >= 97 && charCode <= 122) ||  // a-z
      charCode === 32 ||                      // space
      event.key === 'Backspace') {
    return true;
  }

  event.preventDefault();
  return false;
}
allowAddressCharacters(event: KeyboardEvent): boolean {
  const charCode = event.key.charCodeAt(0);

  // Allow: letters (A–Z, a–z), numbers (0–9), space, comma, dot, slash, hyphen, and backspace
  if ((charCode >= 65 && charCode <= 90) ||   // A-Z
      (charCode >= 97 && charCode <= 122) ||  // a-z
      (charCode >= 48 && charCode <= 57) ||   // 0-9
      charCode === 32 ||                      // space
      charCode === 44 ||                      // ,
      charCode === 46 ||                      // .
      charCode === 47 ||                      // /
      charCode === 45 ||                      // -
      event.key === 'Backspace') {
    return true;
  }

  event.preventDefault();
  return false;
}
showSubtaskMenu: boolean = false;

// You can toggle it via a method
toggleSubtaskMenu(): void {
  this.showSubtaskMenu = !this.showSubtaskMenu;
}
onMenuClick(): void {
  console.log("Menu clicked!");
  // put your menu handling logic here
  // e.g., toggling a dropdown or opening a sub-menu
}


  onSubmit() {
  if (this.form.valid) {
    console.log('Form Data:', this.form.value);
    alert('Form submitted successfully!');
  } else {
    alert('Please fill all required fields.');
  }
}

  // OTP Methods
  sendOTP(type: 'mobile' | 'email') {
    if (type === 'mobile') {
      this.showMobileOtpInput = true;
      console.log('OTP sent to mobile:', this.form.get('mobile')?.value);
    } else {
      this.showEmailOtpInput = true;
      console.log('OTP sent to email:', this.form.get('email')?.value);
    }
  }

  // for OTP popup visibility
  showOtpPopup: boolean = false;

  // whether we are sending OTP for mobile or email
  otpType: 'mobile' | 'email' = 'mobile';

  // entered OTP from input
  enteredOtp: string = '';

  // store generated OTP for demo purpose
  generatedOtp: string = '';

  // open popup
  openOtpPopup(type: 'mobile' | 'email') {
    this.otpType = type;
    this.showOtpPopup = true;

    // for demo: generate 6-digit OTP
    this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP for ${type}:`, this.generatedOtp); // later remove in prod
  }
OTPType: 'email' | 'mobile' = 'email'; // default
showOTPPopup: boolean = false;


  // verify OTP
  verifyOTP(type: 'email' | 'mobile') {
  console.log('Verifying OTP for:', type);

  if (type === 'email') {
    // handle email OTP verification
  } else if (type === 'mobile') {
    // handle mobile OTP verification
  }
}
// Hard-coded PAN
panCardNumber: string = 'ABCDE1234F';
subIDs: string[] = [];

generateSubID() {
  const firstName: string = this.form.get('firstName')?.value || '';
  if (!firstName) return;

  const subId = `${this.panCardNumber}_${firstName.substring(0, 4)}`;
  this.subIds.push(subId);
}




// Mobile OTP variables
showMobileOtpPopup: boolean = false;
enteredOTP: string = '';
otpDigits: string[] = ['', '', '', '', '', ''];
mobileverified: boolean = false;

// Hard-coded user names
superUserName: string = 'Admin Boss';
subUserName: string = 'CRIS';

// Trigger OTP popup when mobile is valid
checkMobile() {
  const mobile = this.form.get('mobile')?.value;
  if (/^[6-9]\d{9}$/.test(mobile)) {
    this.showMobileOtpPopup = true;
  } else {
    this.showMobileOtpPopup = false;
  }
}


// Handle digit input
onOtpInput(event: any, index: number) {
  const value = event.target.value;
  if (!/^\d$/.test(value)) {
    this.otpDigits[index] = '';
    return;
  }
  this.otpDigits[index] = value;

  // Move to next box
  if (index < 5 && value) {
    const nextBox = document.getElementById(`otp-${index + 1}`);
    nextBox?.focus();
  }
}


// Verify OTP
hardCodedOtp = '123456'; // Add this at the top of your component

verifyMobileOtp() {
  const otp = this.otpDigits.join('');
  if (otp === this.hardCodedOtp) {
    this.mobileverified = true;
    this.showMobileOtpPopup = false;
  } else {
    alert('Incorrect OTP! Please try again.');
  }
}
// Hard-coded email OTP
hardCodedEmailOtp = '123456';
showEmailOtpPopup = false;
emailOtpDigits: string[] = ['', '', '', '', '', ''];
emailverified = false;

// Trigger popup when email is valid
checkEmail() {
  const email = this.form.get('email')?.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email)) {
    this.showEmailOtpPopup = true;
  } else {
    this.showEmailOtpPopup = false;
  }
}

// Capture OTP input per box
onEmailOtpInput(event: any, index: number) {
  const value = event.target.value;
  if (/^\d$/.test(value)) {
    this.emailOtpDigits[index] = value;
    // Focus next input
    if (index < 5) {
      const nextInput = document.getElementById('email-otp-' + (index + 1));
      nextInput?.focus();
    }
  } else {
    event.target.value = '';
  }
}

// Verify email OTP
verifyEmailOtp() {
  const otp = this.emailOtpDigits.join('');
  if (otp === this.hardCodedEmailOtp) {
    this.emailverified = true;
    this.showEmailOtpPopup = false;
  } else {
    alert('Incorrect OTP! Please try again.');
  }
}


// Close popup manually
closeOTPPopup() {
  this.showMobileOtpPopup = false;
}




  // close popup
  closeOtpPopup() {
    this.showOtpPopup = false;
    this.enteredOtp = '';
    this.generatedOtp = '';
  }
  

  // Dynamic rows
  addTerminalRow() {
    this.terminalEntries.push({ terminal: '', custCode: '', jv: '' });
  }

  addTaskRow() {
    this.taskEntries.push({ task: '', description: '' });
  }

  // Sub-ID logic
  generateRandomSuffix(length: number = 4): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  generateSubId() {
    const panControl = this.form.get('pan');
    if (!panControl || panControl.invalid) {
      alert('Please enter a valid PAN to generate Sub-ID!');
      panControl?.markAsTouched();
      return;
    }
    const pan = panControl.value.toUpperCase();
    const suffix = this.generateRandomSuffix();
    this.subIds.push(pan + suffix);
  }


  addMoreSubId() {
    const pan = this.form.value.pan;
    if (pan && pan.length === 10) {
      const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      this.subIds.push(`${pan}_${suffix}`);
    }
  }

  // Save form
  saveForm() {
    this.submitted = true;
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      alert('Please fill all required fields correctly!');
      return;
    }
    if (!this.mobileVerified || !this.emailVerified) {
      alert('Please verify both Mobile and Email before submitting!');
      return;
    }
    console.log('Form data:', this.form.value);
    alert('Form saved successfully!');
  }

  
}
