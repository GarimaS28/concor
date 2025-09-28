import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthserviceService } from '../services/authservice.service';
import { CommonModule } from '@angular/common';
import {  EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { Modal } from 'bootstrap'; 
import { Console } from 'console';
@Component({
  selector: 'app-user-stat', 
  imports: [FormsModule,CaptchaComponent,CommonModule],
  templateUrl: './user-stat.component.html',
  styleUrl: './user-stat.component.scss'
})
export class UserStatComponent {
  @ViewChild(CaptchaComponent) captchaComponent!: CaptchaComponent;
  @Output() closeUser = new EventEmitter<void>();

  close() {
    this.closeUser.emit();
  }

  @Output() openLogin = new EventEmitter<void>();
  @Output() openStatusModal = new EventEmitter<any>();  // send data to parent


  showForm: boolean = true;  // controls visibility of request form

  switchToLogin() {
    this.closeUser.emit();  // close user modal
    //this.openLogin.emit();  // tell parent to open login modal
  }

  requestId: string = '';
  authService = inject(AuthserviceService);

 

  

  
showLengthWarning: boolean = false;

checkLength() {
  this.showLengthWarning = this.requestId.length >= 20;
}




  enteredReqId: string = ''; // For input binding
  responseData: any = null;  // For modal display

  constructor(private router: Router, private http: HttpClient,private cdr: ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    
  }


//   fetchRequestStatus() {
//   if (!this.enteredReqId) return;

//   const apiUrl = `http://172.16.4.69:7101/ebook/ebook/getCustReqStatus?davRqstId=${this.enteredReqId}`;

//   this.http.post<any>(apiUrl, {}).subscribe({
//     next: (res) => {
//       if (res.status === 'SUCCESS') {
//         this.responseData = res.data;
//         this.showForm = false;

//         // Make sure any existing modal instance is disposed
//         const modalEl = document.getElementById('statusModal');
//         if (modalEl) {
//           let modal = Modal.getInstance(modalEl);
//           if (modal) {
//             modal.dispose();
//           }
//           modal = new Modal(modalEl, { backdrop: 'static', keyboard: false });
//           modal.show();
//         }
//       } else {
//         this.router.navigate(['/home']);
//       }
//     },
//     error: () => this.router.navigate(['/home'])
//   });
// }

// fetchRequestStatus() {
//   if (!this.enteredReqId) return;

//   const apiUrl = `http://172.16.4.69:7101/ebook/ebook/getCustReqStatus?davRqstId=${this.enteredReqId}`;

//   this.http.post<any>(apiUrl, {}).subscribe({
//     next: (res) => {
//       if (res.status === 'SUCCESS') {
        
        
//         this.responseData = res.data;
// console.log(this.responseData);
//         🚀 Instead of showing modal here, notify parent
//         this.openStatusModal.emit(this.responseData);


//       } else {
//         this.router.navigate(['/home']);
//       }
//     },
//     error: () => this.router.navigate(['/home'])
//   });
// }

// fetchRequestStatus() {
//   if (!this.enteredReqId) return;

//   const apiUrl = `http://172.16.4.69:9105/customer/fetch`;

//   const payload = { p_rqstid: this.enteredReqId };

//   this.http.post<any>(apiUrl, payload).subscribe({
//     next: (res) => {
//       if (res?.result?.jsonRequestData?.length > 0) {
//         const data = res.result.jsonRequestData[0];

//         this.responseData = {
//           rqstId: res.result.p_rqstid,
//           status: data.DAVSTATUS,
//           fullName: `${data.DAVCUSTFNAME} ${data.DAVCUSTLNAME}`.trim()
//         };

//         this.showForm = false;
//         this.cdr.detectChanges();

//         const modalEl = document.getElementById('statusModal');
//         if (modalEl) {
//           let modal = Modal.getInstance(modalEl);
//           if (modal) modal.dispose();
//           modal = new Modal(modalEl, { backdrop: 'static', keyboard: false });
//           modal.show();
//         }
//       } else {
//         this.router.navigate(['/home']);
//       }
//     },
//     error: () => this.router.navigate(['/home'])
//   });
// }

fetchRequestStatus() {
  if (!this.enteredReqId) return;

  const apiUrl = `http://172.16.4.69:9105/customer/fetch`;
  const payload = { p_rqstid: this.enteredReqId };

  this.http.post<any>(apiUrl, payload).subscribe({
    next: (res) => {
      if (res?.result?.jsonRequestData?.length > 0) {
        const data = res.result.jsonRequestData[0];

        this.responseData = {
          rqstId: res.result.p_rqstid,
          status: data.DAVSTATUS,
          fullName: `${data.DAVCUSTFNAME} ${data.DAVCUSTLNAME}`.trim()
        };

        this.showForm = false;

        // 🚀 notify parent that we have data
        this.openStatusModal.emit(this.responseData);

      } else {
        this.router.navigate(['/home']);
      }
    },
    error: () => this.router.navigate(['/home'])
  });
}


get statusLabel(): string {
  switch (this.responseData?.status) {
    case 'PEND': return 'PENDING';
    case 'FRWD': return 'FORWARDED';
    case 'APRV': return 'APPROVED';
    case 'CNCL': return 'CANCELLED';
    default: return this.responseData?.status || '';
  }
}

get statusClass(): string {
  switch (this.responseData?.status) {
    case 'PEND': return 'badge bg-warning text-dark';
    case 'FRWD': return 'badge bg-info text-dark';
    case 'APRV': return 'badge bg-success';
    case 'CNCL': return 'badge bg-danger';
    default: return 'badge bg-secondary';
  }
}




  redirectHome() {
  this.router.navigate(['/home']);
}

redirectToReapply() {
  // Example: navigate to registration form again
  this.router.navigate(['/registration']);
}


  
}




