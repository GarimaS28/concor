// Angular Import
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HelpService } from './services/help.service';
import { SessionService } from './services/session.service';

// project import
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private helpService = inject(HelpService);
  
  private sessionService = inject(SessionService);

  // life cycle event
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    if (this.sessionService.loginId) {
      console.log('User is logged in:', this.sessionService.loginId);
      console.log('Login Type:', this.sessionService.loginType);
      if (this.sessionService.loginType === 'USER') {
        console.log('Maker Checker:', this.sessionService.makerCheckerFlag);
      }
    } else {
      console.log('No user logged in yet');
    }
  
  
    // Call API and automatically store result via tap()
    this.helpService.getHelpData().subscribe({
      next: (data) => {
      
        console.log('Help Data:', data);
      },
      error: (err) => {
        console.error('Error fetching help data:', err);
      }
    });
   

    this.helpService.getTerminalCode().subscribe({
      next: (data) => {
        console.log('Terminal Data:', data);
      },
      error: (err) => {
       // console.error('Error fetching help data:', err);
      }
    });

    this.helpService.getTerminalCodeTo().subscribe({
      next: (data) => {
        console.log('Terminal Data:', data);
      },
      error: (err) => {
       // console.error('Error fetching help data:', err);
      }
    });

    this.helpService.getBussinesssType().subscribe({
      next: (data) => {
        //console.log('Bussiness Type Data:', data);
      },
      error: (err) => {
        console.error('Error fetching help data:', err);
      }
    });

    this.helpService.getState().subscribe({
      next: (data) => {
        //console.log('State Data:', data);
      },
      error: (err) => {
        console.error('Error fetching help data:', err);
      }
    });
    
    this.helpService.getCtnrType().subscribe({
      next: (data) => {
        //console.log('Ctnr Type Data:', data);
      },
      error: (err) => {
        console.error('Error fetching help data:', err);
      }
    });

    

  }
  
}
