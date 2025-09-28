import { Component,  OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GateserviceService } from 'src/app/services/gateservice.service';
import { GatepassstoreserviceService } from 'src/app/services/gatepassstoreservice.service';


@Component({
  selector: 'app-gate-in-pass-retrieve',
  standalone: true,
  imports: [SharedModule, FormsModule,],
  templateUrl: './gate-in-pass-retrieve.component.html', 
  styleUrl: './gate-in-pass-retrieve.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class GateInPassRetrieveInwardComponent implements OnInit {
// Form-related properties
    form: any = {
      
    };
  
    formData: any = null;
    
  
    constructor(private fb: FormBuilder, private router: Router,private gateservice:GateserviceService,private gatepassstore:GatepassstoreserviceService) {
            this.form = this.fb.group({
            GatePassNumber: [''],
            GatePassCurDate: [''],
            GatePassRfndFlag: ['E'],
            GatePassSttn: ['TICD'],
            GatePassOptSlct: ['R'],
            GatePassJvLogin: ['*'],
            GatePassTrmnLogin: ['TICD'],
            GatePassUserLogin: ['CRIS'],
            
          });
            
          }
  
    ngOnInit(): void {
      
  
      
    }

    


  
   
   
  
    // Form submit
     onSubmit() {
alert("submitted");
  const formValues = this.form.value;

  // Prepare the flat payload - SRVC at root level, no wrapping object
  const finalPayload = {
  SRVC: "CTGATEEMPT",
  GP_NUMB : formValues.GatePassNumber,
  RFND_FLAG : formValues.GatePassRfndFlag,
  STTN : formValues.GatePassSttn,
  OPT_SLCT : formValues.GatePassOptSlct,
  JV_LOGIN : formValues.GatePassJvLogin,
  TRMN_LOGIN : formValues.GatePassTrmnLogin,
  USER_LOGIN : formValues.GatePassUserLogin,
  
};

  console.log('📦 Gate Order:', finalPayload);

  this.gateservice.fetchGatePassForm(JSON.stringify(finalPayload)).subscribe({
    next: (res) => {
      const responseData = (res as any).body || {};

      console.log('✅ Submitted successfully', res);
      alert('Form submitted!');
      this.gatepassstore.setGatePassData(responseData);
      this.router.navigate(['/gateInOut']);
    },
    error: (err) => {
      console.error('❌ Submission failed', err);
      alert('Something went wrong!');
    }
  });
}
  
  
 
}



