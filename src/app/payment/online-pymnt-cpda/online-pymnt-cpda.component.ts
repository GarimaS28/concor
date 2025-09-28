
import { Component,  OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormControl, FormsModule} from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GateserviceService } from 'src/app/services/gateservice.service';
import { GatepassstoreserviceService } from 'src/app/services/gatepassstoreservice.service';

@Component({
  selector: 'app-app-online-pymnt-cpda',
  standalone: true,
  imports: [SharedModule, FormsModule,],
  templateUrl: './online-pymnt-cpda.component.html',
  styleUrls: ['./online-pymnt-cpda.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class OnlinePymntCPDAComponent implements OnInit {

  // Form-related properties
  form: any = {
    
  };

  
  // Help data
  
  
  currentDateTime: string = '';
  endOfDay: string = '';
  currentDate: string = '';




  

  constructor(private helpService: HelpService,private fb: FormBuilder, private router: Router,private gateservice:GateserviceService, private gatepasstore: GatepassstoreserviceService) {
    this.form = this.fb.group({
    OPcpdaCode: [''],
    OPcpdaDate: [''],
    OPcpdaCustCode: [''],
    OPcpdaCreditLocn: [''],
    OPcpdaExstngBal: [''],
    OPcpdaDAmount: [''],
    
  });
    
  }

  ngOnInit(): void {
 

  

  const data = this.gatepasstore.getGatePassData();
  if (data) {
    this.formFieldMappings.forEach(({ apiKey, formControlName }) => {
      const value = (data[apiKey] || '').trim();
      this.form.get(formControlName)?.setValue(value);
    });
  }

  // Set today's date in yyyy-MM-dd format for input[type="date"]
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = (today.getMonth() + 1).toString().padStart(2, '0');
  const dd = today.getDate().toString().padStart(2, '0');
  const todayFormatted = `${yyyy}-${mm}-${dd}`;
  this.form.get('OPcpdaDate')?.setValue(todayFormatted);

  this.currentDateTime = this.formatDateTimeLocal(today);
  

  const now = new Date();
const formattedNow = this.formatDateTimeLocal(now);
this.form.get('GOIPissuedOn')?.setValue(formattedNow);


  this.setEndOfDay();
this.form.get('GOIPvalidUpto')?.setValue(this.endOfDay);

}

  formFieldMappings = [
  { apiKey: 'ADDR', formControlName: 'OPcpdaCode' },
  { apiKey: 'CHK_FLAG', formControlName: 'OPcpdaDate' },
  { apiKey: 'CNSR_NAME', formControlName: 'OPcpdaCustCode' },
  { apiKey: 'CNTR_CC', formControlName: 'OPcpdaCreditLocn' },
  { apiKey: 'CRGO_CNTRFLAG', formControlName: 'OPcpdaExstngBal' },
  { apiKey: 'CRGO_CNTRFLAG', formControlName: 'OPcpdaDAmount' },
  

];

  
formatDateTimeLocal(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}




setEndOfDay(): void {
  const now = new Date();
  now.setHours(23, 59, 0, 0); // Set time to 23:59

  const yyyy = now.getFullYear();
  const mm = (now.getMonth() + 1).toString().padStart(2, '0');
  const dd = now.getDate().toString().padStart(2, '0');
  const hh = now.getHours().toString().padStart(2, '0');
  const min = now.getMinutes().toString().padStart(2, '0');

  this.endOfDay = `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}


setCurrentDate(): void {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  this.currentDate = `${day}-${month}-${year}`;
}

formatToDDMMYY(dateStr: string): string {
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${dd}-${mm}-${yyyy.slice(2)}`;
}
  



onSubmit() {
  const formValues = this.form.value;
  const issueDate = this.formatToDDMMYY(formValues.GIOPDate); // <-- conversion
  const timePart = '23:59'; // Set static time for demo; you can make it dynamic

  // Prepare the flat payload - SRVC at root level, no wrapping object
  const finalPayload = {
    SRVC: "CTGATEEMPT",
    ADDR: formValues.OPcpdaCode,
    CUST_CODE: formValues.OPcpdaDate,
    CUST_NAME: formValues.OPcpdaCustCode,
    DRVR_NAME: formValues.OPcpdaCreditLocn,
    HLPR_NAME: formValues.OPcpdaExstngBal,
    ISSUE_TIME: formValues.OPcpdaDAmount,  // e.g. 'dd-MM-yy HH:mm'
    EBOOK_FLAG: 'Y' 

    
  };

  console.log('📦 Final Payload:', finalPayload);

  this.gateservice.submitGatePassForm(JSON.stringify(finalPayload)).subscribe({
    next: (res) => {
      console.log('✅ Submitted successfully', res);
      alert('Form submitted!');
      this.router.navigate(['/gateInOutRtrv']);
    },
    error: (err) => {
      console.error('❌ Submission failed', err);
      alert('Something went wrong!');
    }
  });
}








  

  

  
  
}


