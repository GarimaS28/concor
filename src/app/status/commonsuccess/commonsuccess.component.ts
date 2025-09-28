import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commonsuccess',
  templateUrl: './commonsuccess.component.html',
  styleUrls: ['./commonsuccess.component.scss']
})
export class CommonsuccessComponent implements OnInit {
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
    this.router.navigate(['/home']); // Redirect to home route
  }

}


