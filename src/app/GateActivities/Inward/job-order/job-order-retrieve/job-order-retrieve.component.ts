import { Component,  OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GateserviceService } from 'src/app/services/gateservice.service';
import { GatepassstoreserviceService } from 'src/app/services/gatepassstoreservice.service';


@Component({
  selector: 'app-job-order-retrieve',
  standalone: true,
  imports: [SharedModule, FormsModule,],
  templateUrl: './job-order-retrieve.component.html', 
  styleUrl: './job-order-retrieve.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class JobOrderRetrieveInwardComponent implements OnInit {
// Form-related properties
    form: any = {
      
    };
  
    formData: any = null;
    
  
    constructor(private fb: FormBuilder, private router: Router,private gateservice:GateserviceService,private gatepassstore:GatepassstoreserviceService) {
            this.form = this.fb.group({
            JobOrdrNumber: [''],
            JobOrdrCurDate: [''],
            JobOrdrChkFlag: ['Q'],
            JobOrdrOptSlct: ['C'],
            JobOrdrJvLogin: ['*'],
            JobOrdrTrmnLogin: ['TICD'],
            JobOrdrUserLogin: ['CRIS'],
            
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
  SRVC: "CTJOTRLR",
  JOB_ORDRNUMB : formValues.JobOrdrNumber,
  CHK_FLAG : formValues.JobOrdrChkFlag,
  OPT_SLCT : formValues.JobOrdrOptSlct,
  JV_LOGIN : formValues.JobOrdrJvLogin,
  TRMN_LOGIN : formValues.JobOrdrTrmnLogin,
  USER_LOGIN : formValues.JobOrdrUserLogin,

  
};

  console.log('📦 Job Order Reterieve:', finalPayload);

  this.gateservice.fetchJobOrderForm(JSON.stringify(finalPayload)).subscribe({
    next: (res) => {
      const responseData = (res as any).body || {};

      console.log('✅ Submitted successfully', res);
      alert('Form submitted!');
      this.gatepassstore.setGatePassData(responseData);
      this.router.navigate(['/jobOrder']);
    },
    error: (err) => {
      console.error('❌ Submission failed', err);
      alert('Something went wrong!');
    }
  });
}
  
  
 
}




