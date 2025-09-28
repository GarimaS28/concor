// angular import
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap import
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from 'src/app/notification/notification.component';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule,RouterLink,RouterModule,NotificationComponent],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent {
  // public props
 

  // constructor
  constructor(private authService: AuthserviceService, private router: Router) {
    
  }

  // public method
  // eslint-disable-next-line
  
  
  logoutUser() {
    this.authService.logout(); // This will clear session and redirect
  }
}
