import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otpverification',
  imports: [NgIf,FormsModule],
  templateUrl: './otpverification.component.html',
  styleUrl: './otpverification.component.scss'
})
export class OtpverificationComponent {
  
  showForm1: boolean = true; // Initially hidden
  showForm2: boolean = false;
  showForm3: boolean = false;

  toggleForm1() {
    this.showForm1 = false // Toggle form visibility
    this.showForm2 = true
    this.showForm3 = false
  }

  toggleForm2() {
    this.showForm1 = false // Toggle form visibility
    this.showForm2 = false
    this.showForm3 = true
  }
}
