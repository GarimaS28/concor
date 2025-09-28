  
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
import { Modal } from 'bootstrap';




     interface ContainerInfo {
  ALOTctnrNo: string;
  ALOTctnrSize: string;
  ALOTctnrType: string;
  ALOTctnrOwnd?: string;
}

       
       @Component({
         selector: 'app-change-role',
         standalone: true,
         imports: [SharedModule, FormsModule],
         templateUrl: './change-role.component.html',
         styleUrls: ['./change-role.component.scss'],
         animations: [
           trigger('fadeIn', [
             transition(':enter', [
               style({ opacity: 0 }),
               animate('300ms ease-in', style({ opacity: 1 })),
             ]),
           ]),
         ]
       })
       export class ChangeRoleComponent implements OnInit  {
        
     
  form: FormGroup;

  rolesList: string[] = ['Customer Support', 'Maker', 'Checker', 'Admin', 'CO'];
selectedRoles: string[] = [];

otpValue: string = '';
  currentField: 'mobile' | 'email' = 'mobile';

toggleRole(event: any) {
  const value = event.target.value;
  if (event.target.checked) {
    this.selectedRoles.push(value);
  } else {
    this.selectedRoles = this.selectedRoles.filter(r => r !== value);
  }

  // Update reactive form control
  this.form.patchValue({ roles: this.selectedRoles });
}

ngOnInit() {
  
}


  constructor(private fb: FormBuilder) {
    const currentDate = new Date().toISOString().split('T')[0];

    this.form = this.fb.group({
  terminalName: [{ value: '', disabled: true }],
  userId: [''],
  type: [''],        // radio
  areaName: [''],    // conditional
  terminalCode: [''],// conditional
  coName: ['']       // conditional
});
  }

  onSubmit(){}

//  openOtpModal(field: 'mobile' | 'email') {
//   this.currentField = field;
//   const modalEl = document.getElementById('otpModal');
//   if (modalEl) {
//     const modal = new Modal(modalEl); // ✅ use named Modal
//     modal.show();
//   }
// }

// verifyOtp() {
//   const modalEl = document.getElementById('otpModal');
//   const modal = Modal.getInstance(modalEl!); // get instance
//   modal?.hide();
// }

// currentField: 'mobile' | 'email' = 'mobile';
// otpValue: string = '';

openOtpModal(field: 'mobile' | 'email') {
  this.currentField = field;

  const modalEl = document.getElementById('otpModal');
  if (modalEl) {
    const modal = new Modal(modalEl);  // Using named import from bootstrap
    modal.show();
  }
}

verifyOtp() {
  console.log(`Verifying OTP for ${this.currentField}:`, this.otpValue);
  // API call here
  this.otpValue = '';
  const modalEl = document.getElementById('otpModal');
  const modal = Modal.getInstance(modalEl!);
  modal?.hide();
}

resendOtp() {
  console.log(`Resending OTP for ${this.currentField}`);
  // API call to resend OTP
}

onRetrieve(){}
onDelete(){}

}

    
  







  


