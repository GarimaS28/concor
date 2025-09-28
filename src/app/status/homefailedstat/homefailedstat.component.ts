import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homefailedstat',
  templateUrl: './homefailedstat.component.html',
  styleUrls: ['./homefailedstat.component.scss']
})
export class HomefailedstatComponent {
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
    this.router.navigate(['/home']); // Change '/form' to your form route
  }
  }



