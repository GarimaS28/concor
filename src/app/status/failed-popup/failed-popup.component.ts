import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed-popup',
  templateUrl: './failed-popup.component.html',
  styleUrls: ['./failed-popup.component.scss']
})
export class FailedPopupComponent {
  errorCode: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;

    if (state && state.errCode) {
      this.errorCode = state.errCode;
    }

    if (state && state.errMsg) {
      this.errorMessage = state.errMsg;
    }
  }

  tryAgain(): void {
    this.router.navigate(['/analytics']); // Change '/form' to your form route
  }
  }



