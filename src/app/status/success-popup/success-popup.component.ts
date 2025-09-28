
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent implements OnInit {
  [x: string]: any;
  //@Input() requestId: string = '';
  @Input() show: boolean = false;

   requestId = '';

   constructor(private router: Router){}

  ngOnInit(): void {
    const navState = history.state;
    if (navState?.requestId) {
      this.requestId = navState.requestId;
    }
  }

  goHome() {
    this.router.navigate(['/analytics']); // Redirect to home route
  }

}

