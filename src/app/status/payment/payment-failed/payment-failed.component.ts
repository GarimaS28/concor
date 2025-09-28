
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-failed',
  imports:[CommonModule],
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.scss']
})
export class PaymentFailedComponent {
  showError = false;

  retryPayment() {
    window.location.href = 'https://concorindia.co.in/payment';
  }

  contactSupport() {
    window.location.href = 'https://concorindia.co.in/contact';
  }

  ngOnInit() {
    setTimeout(() => {
      this.showError = true;
    }, 2000);
  }
}

