
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {

  showThankMsg = false;

  showThankYou() {
    this.showThankMsg = true;
    setTimeout(() => {
      window.location.href = "https://concorindia.co.in";
    }, 5000);
  }

  downloadReceipt() {
    // const { jsPDF } = window.jspdf;
    // const doc = new jsPDF();

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(18);
    // doc.text("Payment Receipt", 70, 20);

    // doc.setFontSize(12);
    // doc.setFont("helvetica", "normal");
    // doc.text("Order ID: 202212272210167582", 20, 40);
    // doc.text("Merchant: Container Corporation of India Ltd.", 20, 50);
    // doc.text("Amount Paid: ₹50,000.00", 20, 60);
    // doc.text("Status: Success", 20, 70);
    // doc.text("Date: " + new Date().toLocaleString(), 20, 80);

    // doc.setFont("helvetica", "italic");
    // doc.text("Thank you for your payment! Visit CONCOR.", 20, 100);

    // doc.save("Payment_Receipt.pdf");
  }
}
