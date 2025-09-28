
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';

@Component({
  selector: 'app-notification',
  imports: [SharedModule, RouterLink, RouterModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'], // yahan styleUrl ko styleUrls kar diya hai
  providers: [NgbDropdownConfig],
})
export class NotificationComponent {
  notifications = {
    new: [{ read: false }],
    earlier: [{ read: false }, { read: false }],
  };

  constructor() {}

  markAllAsRead() {
    this.notifications.new.forEach((n) => (n.read = true));
    this.notifications.earlier.forEach((n) => (n.read = true));
  }
}