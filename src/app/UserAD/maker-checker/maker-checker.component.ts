import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SessionService } from 'src/app/services/session.service';  // ✅ import
import { UserApprovalServiceService } from 'src/app/services/user-approval-service.service';
import { OtpService } from 'src/app/services/otp-service.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

declare var bootstrap: any;

@Component({
  selector: 'app-maker-checker',
  imports: [CommonModule,RouterModule,SharedModule],
  templateUrl: './maker-checker.component.html',
  styleUrls: ['./maker-checker.component.scss']
})
export class MakerCheckerComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  selectedFilter: string = 'all';
  selectedRequest: any = null;

  makerCheckerFlag: string | null = null; // ✅ store flag
  allRequests: any;

  constructor(
    private DashboardService: DashboardService,
    private sessionService: SessionService,
    private UserApprovalServiceService:UserApprovalServiceService , 
    private otpService: OtpService,
    private router: Router // ✅ inject
  ) {}

  ngOnInit(): void {
    this.makerCheckerFlag = this.sessionService.makerCheckerFlag; // ✅ fetch flag once
    console.log('MakerChecker Flag:', this.makerCheckerFlag);
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.DashboardService.fetchData().subscribe({
      next: (res: any) => {
        if (res.status === 'SUCCESS' && res.data) {
          this.requests = res.data;
          this.filteredRequests = [...this.requests];
        }
      },
      error: (err) => {
        console.error('❌ MakerChecker API Error:', err);
      }
    });
  }

  filterByDate(date:string){}

  filterRequests(status: string) {
    this.selectedFilter = status;
    if (status === 'all') {
      this.filteredRequests = [...this.requests];
    } else {
      this.filteredRequests = this.requests.filter(r => r.davStatus === status);
    }
  }

  openModal(req: any) {
    this.DashboardService.fetchByReqId(req.davRqstId).subscribe({
      next: (res: any) => {
        this.selectedRequest = res.status === 'SUCCESS' ? res.data : req;

        const modal = new (window as any).bootstrap.Modal(
          document.getElementById('requestDetailModal')
        );
        modal.show();
      },
      error: (err) => {
        console.error('❌ Detail API Error:', err);
        this.selectedRequest = req;

        const modal = new (window as any).bootstrap.Modal(
          document.getElementById('requestDetailModal')
        );
        modal.show();
      }
    });
  }

  viewDocument(base64Data: string, mimeType: string) {
    try {
      if (!base64Data) return;

      const cleanedBase64 = base64Data.replace(/\s/g, '');
      const byteCharacters = atob(cleanedBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (err) {
      console.error("❌ Error decoding base64 document:", err);
    }
  }

  documentStatus: { [key: string]: string } = {};

setDocumentStatus(key: string, status: string) {
  this.documentStatus[key] = status;
}

  
  // approveRequest(davRqstId: string) {
  //   this.UserApprovalServiceService.approvedRequest(davRqstId).subscribe({
  //     next: (res) => {
  //       console.log('Forward Success ✅:', res);
  //       //alert('Request forwarded successfully!');
  //       // 🔄 Optionally refresh list or close modal
  //       this.router.navigate(['/Approver']);
  //       this.ngOnInit();
  //     },
  //     error: (err) => {
  //       console.error('Forward Failed ❌:', err);
  //       //alert('Failed to forward request');
  //       this.router.navigate(['/Approver']);
  //       this.ngOnInit();
  //     }
  //   });
  // }

//   approveRequest(davRqstId: string) {
//   this.UserApprovalServiceService.approvedRequest(davRqstId).subscribe({
//     next: (res) => {
//       console.log('Approve Success ✅:', res);

//       // 1️⃣ Close the modal
//       const modalElement = document.getElementById('requestDetailModal');
//       if (modalElement) {
//         const modalInstance = bootstrap.Modal.getInstance(modalElement) 
//           || new bootstrap.Modal(modalElement);
//         modalInstance.hide();
//       }

//       // 2️⃣ Re-run ngOnInit (refresh data)
//       this.ngOnInit();
//     },
//     error: (err) => {
//       console.error('Approve Failed ❌:', err);

//       // Also close modal on error (optional)
//       const modalElement = document.getElementById('requestDetailModal');
//       if (modalElement) {
//         const modalInstance = bootstrap.Modal.getInstance(modalElement) 
//           || new bootstrap.Modal(modalElement);
//         modalInstance.hide();
//       }

//       this.otpService.sendOtp(this.enteredMobile, otpCode, otpPurpose).subscribe({
//       next: (res) => {
//         this.otpHash = res?.otp_data?.hash ?? null;
//         this.otpTimestamp = res?.otp_data?.timestamp ?? null;
//         this.otpStatus = 'pending';
//         this.startTimer();
//       },
//       error: () => alert('Failed to send OTP. Please try again.')
//     });

//       // Refresh data anyway
//       this.ngOnInit();
//     }
//   });
// }

approveRequest(davRqstId: string) {
  this.UserApprovalServiceService.approvedRequest(davRqstId).subscribe({
    next: (res) => {
      console.log('Approve Success ✅:', res);

      // 1️⃣ Close the modal
      const modalElement = document.getElementById('requestDetailModal');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) 
          || new bootstrap.Modal(modalElement);
        modalInstance.hide();
      }

      // 2️⃣ Call Mobile/OTP Service
      // const payload = {
      //   to: "8178016112",
      //   code: "D_Task",
      //   values: {
      //     Customer: "Ankit",
      //     purpose: "Id & Password",
      //     TaskId: "ABCDE1234F and plplplplpl",
      //     Date: "sg"
      //   }
      // };
       
      // this.otpService.sendOtp(payload).subscribe({
      //   next: (otpRes) => {
      //     console.log('OTP Service Success 📩:', otpRes);

      //     // Extract useful info
      //     const guid = otpRes?.messageack?.guids?.[0]?.guid ?? null;
      //     const msgId = otpRes?.messageack?.guids?.[0]?.id ?? null;
      //     console.log(`GUID: ${guid}, Message ID: ${msgId}`);
      //   },
      //   error: (err) => {
      //     console.error('OTP Service Failed ❌:', err);
      //     alert('Failed to send OTP. Please try again.');
      //   }
      // });

      // 3️⃣ Refresh data
      this.ngOnInit();
    },
    error: (err) => {
      console.error('Approve Failed ❌:', err);

      // Close modal anyway
      const modalElement = document.getElementById('requestDetailModal');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) 
          || new bootstrap.Modal(modalElement);
        modalInstance.hide();
      }

      // Refresh data anyway
      this.ngOnInit();
    }
  });
}



  forwardRequest(davRqstId: string) {
    this.UserApprovalServiceService.forwardRequest(davRqstId).subscribe({
      next: (res) => {
        console.log('Forward Success ✅:', res);
        alert('Request forwarded successfully!');
        // 🔄 Optionally refresh list or close modal
        this.router.navigate(['/Approver']);
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Forward Failed ❌:', err);
        //alert('Failed to forward request');
        this.router.navigate(['/Approver']);
        this.ngOnInit();
      }
    });
  }

  rejectRequest(davRqstId: string) {
    this.UserApprovalServiceService.rejectedRequest(davRqstId).subscribe({
      next: (res) => {
        console.log('Cancel Success ✅:', res);
        alert('Request Rejected successfully!');
        // 🔄 Optionally refresh list or close modal
        this.router.navigate(['/Approver']);
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Cancel Failed ❌:', err);
        alert('Failed to forward request');
        this.router.navigate(['/Approver']);
        this.ngOnInit();
      }
    });
  }

  fromDate!: string; // bind to input type="date"
toDate!: string;

filterByDateRange() {
  if (!this.fromDate || !this.toDate) {
    alert('Please select both From and To dates');
    return;
  }

  const from = new Date(this.fromDate);
  const to = new Date(this.toDate);

  this.filteredRequests = this.allRequests.filter((req: { dadRqstDate: string | number | Date; }) => {
    const reqDate = new Date(req.dadRqstDate);
    return reqDate >= from && reqDate <= to;
  });
}


}
