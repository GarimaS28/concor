
import { ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { LoginComponent } from "src/app/login/login.component";
import { UserStatComponent } from 'src/app/user-stat/user-stat.component';
import { ForgetpasswordComponent } from "src/app/forgetpassword/forgetpassword.component";
import { Modal } from 'bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [RouterModule, LoginComponent, CommonModule, UserStatComponent, ForgetpasswordComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {


  @ViewChild(UserStatComponent) userStatComp!: UserStatComponent;
  
  showLoginOverlay = false;
  showUserOverlay = false;
 showForgetPwdOverlay = false;

 appVersion = '1.0.0'; // change as needed

  closeOverlay(event: MouseEvent) {
    this.showLoginOverlay = false;
    this.showUserOverlay = false;
    this.showForgetPwdOverlay = false;
  }

   constructor(private router: Router, private http: HttpClient,private cdr: ChangeDetectorRef) {
      
    }



currentDateTime: Date = new Date();
  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000); // update every second
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  statusData: any = null;

handleStatusModal(data: any) {
  this.statusData = data; // store response
}

closeStatus() {
  this.statusData = null;
  this.showUserOverlay = false;
  this.router.navigate(['/home']);
}

getStatusLabel(status: string): string {
  switch (status) {
    case 'PEND': return 'PENDING';
    case 'FRWD': return 'FORWARDED';
    case 'APRV': return 'APPROVED';
    case 'CNCL': return 'CANCELLED';
    default: return status || '';
  }
}

getStatusClass(status: string): string {
  switch (status) {
    case 'PEND': return 'badge bg-warning text-dark';
    case 'FRWD': return 'badge bg-info text-dark';
    case 'APRV': return 'badge bg-success';
    case 'CNCL': return 'badge bg-danger';
    default: return 'badge bg-secondary';
  }
}


 callRedirectToReapply() {
    if (this.userStatComp) {
      this.userStatComp.redirectToReapply();  // ✅ call child’s method
    }
  }






  
}
