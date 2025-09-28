import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-user-strip',
  imports: [],
  templateUrl: './user-strip.component.html',
  styleUrl: './user-strip.component.scss'
})
export class UserStripComponent implements OnInit {

  constructor(private SessionService:SessionService){}

  dateTime: string = '';
  private intervalId: any;

  loginId: string | null = '';
  loginType: string | null = '';
  makerchecker: string | null = '';

  ngOnInit(): void {

    this.loginId = this.SessionService.loginId;
    this.loginType = this.SessionService.loginType;
    const MCBflag=this.SessionService.makerCheckerFlag;

    if(MCBflag==='M'){
      this.makerchecker='Maker'
    }else if(MCBflag==='C'){
      this.makerchecker='Checker'
    }else if(MCBflag==='B'){
      this.makerchecker='Both'
    }
    

    this.updateDateTime(); // initialize immediately
    this.intervalId = setInterval(() => this.updateDateTime(), 1000);
  }

  
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateDateTime(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', year: 'numeric', month: 'short', 
      day: 'numeric', hour: '2-digit', minute: '2-digit', 
      second: '2-digit' 
    };
    this.dateTime = now.toLocaleString('en-IN', options);
  }


}
