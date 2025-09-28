import { CommonModule } from '@angular/common';
import { Component,OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-captcha',
  imports: [FormsModule,CommonModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
})
export class CaptchaComponent implements OnInit, OnDestroy {
  
  captchaText: string = '';
  userInput: string = '';
  isValid: boolean | null = null;
  timeRemaining: number = 300; // 5 minutes in seconds
  private timer: any;

  constructor() {
    this.generateCaptcha();
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer); // Clean up the timer when the component is destroyed
    }
  }

  // Generate random 6-character CAPTCHA
  generateCaptcha(): void {
    this.captchaText = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.userInput = '';
    this.isValid = null;
    this.resetTimer(); // Reset the timer whenever a new CAPTCHA is generated
  }

  // Validate User Input
  validateCaptcha(): void {
    this.isValid = this.userInput.toUpperCase() === this.captchaText;
  }

  // Start the countdown timer
  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.generateCaptcha(); // Refresh CAPTCHA after 5 minutes
      }
    }, 1000); // Decrease time every second
  }

  // Reset the timer when CAPTCHA is refreshed
  resetTimer(): void {
    this.timeRemaining = 300; // Reset to 5 minutes
  }

}
