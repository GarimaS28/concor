
import { Component,  OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormControl, FormsModule} from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GateserviceService } from 'src/app/services/gateservice.service';
import { GatepassstoreserviceService } from 'src/app/services/gatepassstoreservice.service';
import { CaptchaComponent } from "src/app/captcha/captcha.component";

import { OtpService } from 'src/app/services/otp-service.service';


@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [SharedModule, FormsModule, CaptchaComponent],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class ChangepasswordComponent implements OnInit {

  // Form-related properties
  form: any = {
    
  };

  
  // Help data
  helpData: any[] = [];
  filteredCmdtList: any[] = [];
  selectedCmdtCode: string = '';
  selectedCmdtDesc: string = '';

  consignerHelpData: any[] = [];
  filteredConsignerList: any[] = [];

  
  consigneeHelpData: any[] = [];
  filteredConsigneeList: any[] = [];

  
  selectedCnsrCode: string = '';
  selectedCnsrName: string = '';

 

  customerIdHelpData: any[] = [];
  filteredCustomerIdList: any[] = [];
  selectedCustomerId: string = '';

  
  currentDateTime: string = '';
  endOfDay: string = '';
  currentDate: string = '';




  

  constructor(private helpService: HelpService,private fb: FormBuilder, private router: Router,private gateservice:GateserviceService, private gatepasstore: GatepassstoreserviceService,private OtpService: OtpService) {
    this.form = this.fb.group({
    CustUserName: [''],
    CustoldPass: [''],
    CustNewPass: [''],
    CustMobileNo: [''],
    CustMobileOTP: [''],
    
  });
    
  }

  ngOnInit(): void {
 
  

}





onSubmit() {
  const formValues = this.form.value;
  
  const timePart = '23:59'; // Set static time for demo; you can make it dynamic

  // Prepare the flat payload - SRVC at root level, no wrapping object
  const finalPayload = {
    SRVC: "CTGATEEMPT",
    ADDR: formValues.GOIPaddress,
    BACK_TRMLFLAG: "N",
    CMDT_CHKFLAG: "N",
    CRGO_CNTRFLAG: "C",
    CUST_CODE: formValues.GOIPCnsrCode,
    CUST_NAME: formValues.GOIPCnsrName,
    DRVR_NAME: formValues.GOIPdrivername,
    HLPR_NAME: formValues.GOIPhelpername,
    ISSUE_TIME: formValues.GOIPissuedOn,  // e.g. 'dd-MM-yy HH:mm'
    RFND_FLAG: "E",
    RMRK: formValues.GOIPremarks,
    STTN: formValues.GIOPSttnFrm,
    TRLR_NUMB: formValues.GOIPtrailernumb,
    USER_ID: "CRIS",
    VALD_FLAG: "", // If you have this value, set it here
    VHCL_OWNEDBY: "P",
    VHCL_TYPEFLAG: formValues.GOIPvhcltype,
    VLDT_UPTO: formValues.GOIPvalidUpto,
    WGHT: formValues.GOIPvhclwght,
    ICOUNT: "0",
    CHK_FLAG: "I",
    OPT_SLCT: "S",
    CNTR_CC: "", // Optional
    GATE_INOUTTIME: formValues.GOIPissuedOn, // same as ISSUE_TIME
    RFND_NUMB: "",
    PERMIT_NUMB: "",
    JV_LOGIN: "*",
    TRMN_LOGIN: formValues.GIOPSttnFrm,
    USER_LOGIN: "CRIS" ,
    EBOOK_FLAG: 'Y' 
  };

  console.log('📦 Final Payload:', finalPayload);

  this.gateservice.submitGatePassForm(JSON.stringify(finalPayload)).subscribe({
    next: (res) => {
      console.log('✅ Submitted successfully', res);
      alert('Form submitted!');
      this.router.navigate(['/gateInOutRtrv']);
    },
    error: (err) => {
      console.error('❌ Submission failed', err);
      alert('Something went wrong!');
    }
  });
}



// OTP Flow
showOtpModal = false;
otpStatus: 'pending' | 'success' | 'error' | 'expired' | null = null;
countdown = 0;
private timer: any;

otpHash: string | null = null;
otpTimestamp: number | null = null;
validityPeriod = 120; // seconds
enteredMobile = '';
mobileVerified = false;

onMobileInput(event: any) {
  const mobile = event.target.value;

  if (mobile.length === 10) {
    this.enteredMobile = mobile;
    this.openOtpModal();
  }
}



/** Open OTP modal & send OTP */
openOtpModal() {
  this.enteredMobile = this.form.value.CustMobileNo;
  console.log("📱 Mobile:", this.enteredMobile);

  // Pass custom values here 👇
  const otpCode = 'D_OTP';
  const otpPurpose = 'Login1';

  this.OtpService.sendOtp(this.enteredMobile, otpCode, otpPurpose).subscribe({
    next: (res) => {
      console.log('✅ OTP Sent Response:', res);
      this.otpHash = res?.otp_data?.hash;
      this.otpTimestamp = res?.otp_data?.timestamp;
      this.otpStatus = null;

      this.startTimer();
      this.showOtpModal = true;
    },
    error: (err) => {
      console.error('❌ Failed to send OTP', err);
      alert('Failed to send OTP. Please try again.');
    }
  });
}


/** Timer */
startTimer() {
  this.countdown = this.validityPeriod;
  if (this.timer) clearInterval(this.timer);

  this.timer = setInterval(() => {
    this.countdown--;
    if (this.countdown <= 0) {
      clearInterval(this.timer);
      this.otpStatus = 'expired';
    }
  }, 1000);
}

clearTimer() {
  if (this.timer) {
    clearInterval(this.timer);
    this.timer = null;
  }
}

/** Resend OTP */
/** Resend OTP */
resendOtp() {
  if (!this.enteredMobile || this.enteredMobile.length !== 10) {
    alert("Please enter a valid 10-digit mobile number first.");
    return;
  }

  console.log("🔄 Resending OTP for:", this.enteredMobile);
  this.openOtpModal();

  // Re-enable OTP input
  this.form.get('CustMobileNo')?.enable();
  this.otpStatus = null;
}


onOtpInput(event: any) {
  const otp = event.target.value;
  if (otp.length === 6) {
    this.validateOtp(otp); // pass OTP here
  }
}

/** Verify OTP */
validateOtp(otp: string) {
  if (otp?.length === 6 && this.otpHash && this.otpTimestamp) {
    this.OtpService.verifyOtp(this.enteredMobile, otp, 2, this.otpHash, this.otpTimestamp).subscribe({
      next: (res) => {
        console.log('✅ OTP Verify Response:', res);
        
        if (res?.verified === true) {   // ✅ boolean check
          this.otpStatus = 'success';
        } else {
          this.otpStatus = 'error';
        }
      },
      error: (err) => {
        console.error('❌ OTP verification failed', err);
        this.otpStatus = 'error';
      }
    });
  }
}


/** Confirm OTP */
confirmOtp() {
  this.mobileVerified = true;
  this.showOtpModal = false;
  this.form.get('rgstmobno')?.disable();
}

/** Close Modal */
closeOtpModal() {
  this.showOtpModal = false;
  this.clearTimer();
}







  

  

  
  
}


