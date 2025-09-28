import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Console } from 'console';

@Component({
  selector: 'app-homesuccessstat',
  imports:[CommonModule],
  templateUrl: './homesuccessstat.component.html',
  styleUrls: ['./homesuccessstat.component.scss']
})
export class HomesuccessstatComponent implements OnInit {
  [x: string]: any;
  //@Input() requestId: string = '';
  @Input() show: boolean = false;

   requestId = '';

   constructor(private router: Router){}

  ngOnInit(): void {
  const navState = history.state;
  if (navState?.requestId) {
    this.requestId = navState.requestId;
    console.log("ID : "+this.requestId);
  }
}

  goHome() {
    this.router.navigate(['/home']); // Redirect to home route
  }

}


