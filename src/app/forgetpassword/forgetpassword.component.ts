import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaptchaComponent } from '../captcha/captcha.component';
import { OtpService } from '../services/otp-service.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CaptchaComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  @ViewChild(CaptchaComponent) captchaComponent!: CaptchaComponent;
  @Output() closeUser = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();
  @Output() closeLogin = new EventEmitter<void>();

  step = 1;
  captchaVerified = false;

  // ✅ Separate flags for OTPs
  mobileOtpVerified = false;
  emailOtpVerified = false;

  // ✅ Reactive Forms
  form: FormGroup;

  // OTP metadata
  mobileOtpHash: string | null = null;
  mobileOtpTimestamp: number | null = null;
  mobileOtpStatus: 'pending' | 'success' | 'error' | 'expired' | null = null;

  emailOtpHash: string | null = null;
  emailOtpTimestamp: number | null = null;
  emailOtpStatus: 'pending' | 'success' | 'error' | 'expired' | null = null;

  // Timers
  mobileCountdown = 0;
  emailCountdown = 0;
  private mobileTimer: any;
  private emailTimer: any;
  validityPeriod = 120; // seconds

  enteredMobile = '';
  enteredEmail = '';

  constructor(
    private fb: FormBuilder,
    private otpService: OtpService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobileOtp: this.fb.array(Array(6).fill('').map(() => this.fb.control(''))),
      emailOtp: this.fb.array(Array(6).fill('').map(() => this.fb.control(''))),
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  /** ✅ Helpers for OTP FormArrays */
  get mobileOtpArray(): FormArray {
    return this.form.get('mobileOtp') as FormArray;
  }
  get mobileOtpControls(): FormControl[] {
    return this.mobileOtpArray.controls as FormControl[];
  }

  get emailOtpArray(): FormArray {
    return this.form.get('emailOtp') as FormArray;
  }
  get emailOtpControls(): FormControl[] {
    return this.emailOtpArray.controls as FormControl[];
  }

  switchToLogin() {
    this.closeUser.emit();
    this.openLogin.emit();
  }

  /** ✅ Verify Captcha and trigger OTPs */
  verifyCaptcha() {
    this.captchaComponent.validateCaptcha();
    if (!this.captchaComponent?.isValid) return;

    this.captchaVerified = true;
    this.enteredMobile = this.form.value.mobile;
    this.enteredEmail = this.form.value.email;

    if (/^\d{10}$/.test(this.enteredMobile)) {
      this.sendMobileOtp();
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }

    if (this.enteredEmail && /\S+@\S+\.\S+/.test(this.enteredEmail)) {
      this.sendEmailOtp();
    } else {
      alert('Please enter a valid email address.');
    }
  }

  /** ✅ Send Mobile OTP */
  sendMobileOtp() {
    this.otpService.sendOtp(this.enteredMobile, 'M_OTP', 'PasswordReset').subscribe({
      next: (res) => {
        this.mobileOtpHash = res?.otp_data?.hash ?? null;
        this.mobileOtpTimestamp = res?.otp_data?.timestamp ?? null;
        this.mobileOtpStatus = 'pending';
        this.startMobileTimer();
      },
      error: () => alert('Failed to send Mobile OTP. Please try again.')
    });
  }

  /** ✅ Send Email OTP */
  sendEmailOtp() {
    this.otpService.sendOtp(this.enteredEmail, 'E_OTP', 'PasswordReset').subscribe({
      next: (res) => {
        this.emailOtpHash = res?.otp_data?.hash ?? null;
        this.emailOtpTimestamp = res?.otp_data?.timestamp ?? null;
        this.emailOtpStatus = 'pending';
        this.startEmailTimer();
      },
      error: () => alert('Failed to send Email OTP. Please try again.')
    });
  }

  /** ✅ OTP Input Navigation (Mobile) */
  onMobileOtpInput(event: any, index: number) {
    const val = (event.target.value || '').replace(/\D/g, '').slice(0, 1);
    this.mobileOtpArray.at(index).setValue(val);

    if (val && index < this.mobileOtpControls.length - 1) {
      const next = document.querySelectorAll<HTMLInputElement>('.otp-box.mobile')[index + 1];
      next?.focus();
    }
  }
  onMobileOtpBackspace(event: any, index: number) {
    if (!(this.mobileOtpArray.at(index).value) && index > 0) {
      const prev = document.querySelectorAll<HTMLInputElement>('.otp-box.mobile')[index - 1];
      prev?.focus();
    }
  }
  onMobileOtpPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
    if (!text) return;

    text.split('').forEach((digit, i) => {
      if (i < this.mobileOtpControls.length) this.mobileOtpArray.at(i).setValue(digit);
    });
  }

  /** ✅ OTP Input Navigation (Email) */
  onEmailOtpInput(event: any, index: number) {
    const val = (event.target.value || '').replace(/\D/g, '').slice(0, 1);
    this.emailOtpArray.at(index).setValue(val);

    if (val && index < this.emailOtpControls.length - 1) {
      const next = document.querySelectorAll<HTMLInputElement>('.otp-box.email')[index + 1];
      next?.focus();
    }
  }
  onEmailOtpBackspace(event: any, index: number) {
    if (!(this.emailOtpArray.at(index).value) && index > 0) {
      const prev = document.querySelectorAll<HTMLInputElement>('.otp-box.email')[index - 1];
      prev?.focus();
    }
  }
  onEmailOtpPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
    if (!text) return;

    text.split('').forEach((digit, i) => {
      if (i < this.emailOtpControls.length) this.emailOtpArray.at(i).setValue(digit);
    });
  }

  /** ✅ Verify Mobile OTP */
  verifyMobileOtp() {
    const enteredOtp = this.mobileOtpControls.map(c => c.value).join('');
    if (enteredOtp.length !== 6) {
      alert('Please enter full 6-digit Mobile OTP.');
      return;
    }

    // this.otpService.verifyOtp(this.enteredMobile, enteredOtp, 2, this.mobileOtpHash, this.mobileOtpTimestamp).subscribe({
    //   next: (res) => {
    //     if (res?.status === 'VERIFIED') {
    //       this.mobileOtpVerified = true;
    //       this.mobileOtpStatus = 'success';
    //       this.clearMobileTimer();
    //       this.checkBothOtpsVerified();
    //     } else {
    //       this.mobileOtpStatus = 'error';
    //       alert('Invalid Mobile OTP.');
    //     }
    //   },
    //   error: () => {
    //     this.mobileOtpStatus = 'error';
    //     alert('Error verifying Mobile OTP.');
    //   }
    // });
  }

  /** ✅ Verify Email OTP */
  verifyEmailOtp() {
    const enteredOtp = this.emailOtpControls.map(c => c.value).join('');
    if (enteredOtp.length !== 6) {
      alert('Please enter full 6-digit Email OTP.');
      return;
    }

    // this.otpService.verifyOtp(this.enteredEmail, enteredOtp, 2, this.emailOtpHash, this.emailOtpTimestamp).subscribe({
    //   next: (res) => {
    //     if (res?.status === 'VERIFIED') {
    //       this.emailOtpVerified = true;
    //       this.emailOtpStatus = 'success';
    //       this.clearEmailTimer();
    //       this.checkBothOtpsVerified();
    //     } else {
    //       this.emailOtpStatus = 'error';
    //       alert('Invalid Email OTP.');
    //     }
    //   },
    //   error: () => {
    //     this.emailOtpStatus = 'error';
    //     alert('Error verifying Email OTP.');
    //   }
    // });
  }

  /** ✅ Proceed only when both OTPs are verified */
  checkBothOtpsVerified() {
    if (this.mobileOtpVerified && this.emailOtpVerified) {
      this.step = 2;
    }
  }

  /** ✅ Timers */
  startMobileTimer() {
    this.mobileCountdown = this.validityPeriod;
    if (this.mobileTimer) clearInterval(this.mobileTimer);

    this.mobileTimer = setInterval(() => {
      this.mobileCountdown--;
      if (this.mobileCountdown <= 0) {
        clearInterval(this.mobileTimer);
        this.mobileOtpStatus = 'expired';
      }
    }, 1000);
  }
  clearMobileTimer() {
    if (this.mobileTimer) clearInterval(this.mobileTimer);
  }

  startEmailTimer() {
    this.emailCountdown = this.validityPeriod;
    if (this.emailTimer) clearInterval(this.emailTimer);

    this.emailTimer = setInterval(() => {
      this.emailCountdown--;
      if (this.emailCountdown <= 0) {
        clearInterval(this.emailTimer);
        this.emailOtpStatus = 'expired';
      }
    }, 1000);
  }
  clearEmailTimer() {
    if (this.emailTimer) clearInterval(this.emailTimer);
  }

  /** ✅ Save Password */
  savePassword() {
    const { newPassword, confirmPassword } = this.form.value;
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert('Password reset successfully!');
    this.router.navigate(['home']);
  }
}
