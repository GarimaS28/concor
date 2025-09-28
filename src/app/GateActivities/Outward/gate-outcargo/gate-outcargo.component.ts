
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
  selector: 'app-gate-outcargo',
  standalone: true,
  imports: [SharedModule, FormsModule,],
  templateUrl: './gate-outcargo.component.html',
  styleUrls: ['./gate-outcargo.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class GateOUTCargoComponent implements OnInit {

  // Form-related properties
  form: any = {
    
  };

  
  // Help data
  helpData: any[] = [];
  filteredCmdtList: any[] = [];
  selectedCmdtCode: string = '';
  selectedCmdtDesc: string = '';

  consignerHelpData: any[] = [];
  filteredConsignerList: any[] = [];

  
  consigneeHelpData: any[] = [];
  filteredConsigneeList: any[] = [];

  
  selectedCnsrCode: string = '';
  selectedCnsrName: string = '';

 

  customerIdHelpData: any[] = [];
  filteredCustomerIdList: any[] = [];
  selectedCustomerId: string = '';

  
  currentDateTime: string = '';
  endOfDay: string = '';
  currentDate: string = '';




  

  constructor(private helpService: HelpService,private fb: FormBuilder, private router: Router,private gateservice:GateserviceService, private gatepasstore: GatepassstoreserviceService) {
    this.form = this.fb.group({
    GIOPSttnFrm: [''],
    GIOPDate: [''],
    GIOPReason: ['cargo'],
    GOIPgatepass: ['gateout'],
    GOIPCnsrCode: [''],
    GOIPCnsrName: [''],
    GOIPCnsgId: [''],
    GOIPCtnrNumb: [''],
    GOIPvhcltype: [''],
    GOIPissuedOn: [''],
    GOIPvalidUpto: [''],
    GOIPGunnyBales: [''],
    GOIPtrailernumb: [''],
    GOIPdrivername: [''],
    GOIPhelpername: [''],
    GOIPvhclwght: [''],
    GOIPaddress: [''],
    GOIPremarks: [''],
    GOIPjobodrnumb: [''],
    GOIPnoofbales: [''],
    GOIPmilCode: [''],
    GOIPDlvryOrdr: [''],
    
  });
    
  }

  ngOnInit(): void {
  this.helpService.helpData$.subscribe(data => {
    if (data?.result) {
      this.helpData = data.result;
      this.filteredCmdtList = [...this.helpData];
    }
  });

  this.helpService.cnsrcustomerData$.subscribe(data => {
    if (data?.result) {
      this.consignerHelpData = data.result;
      this.filteredConsignerList = [...this.consignerHelpData];
    }
  });

  this.helpService.cnsecustomerData$.subscribe(data => {
    if (data?.result) {
      this.consigneeHelpData = data.result;
      this.filteredConsigneeList = [...this.consigneeHelpData];
    }
  });

  this.helpService.custIdData$.subscribe(data => {
    if (data?.result) {
      this.customerIdHelpData = data.result;
      this.filteredCustomerIdList = [...this.customerIdHelpData];
    }
  });

  

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
  this.form.get('GIOPDate')?.setValue(todayFormatted);

  this.currentDateTime = this.formatDateTimeLocal(today);
  

  const now = new Date();
const formattedNow = this.formatDateTimeLocal(now);
this.form.get('GOIPissuedOn')?.setValue(formattedNow);


  this.setEndOfDay();
this.form.get('GOIPvalidUpto')?.setValue(this.endOfDay);

}

  formFieldMappings = [
  { apiKey: 'ADDR', formControlName: 'GOIPaddress' },
  { apiKey: 'CHK_FLAG', formControlName: '' },
  { apiKey: 'CNSR_NAME', formControlName: '' },
  { apiKey: 'CNTR_CC', formControlName: '' },
  { apiKey: 'CRGO_CNTRFLAG', formControlName: '' },
  
  { apiKey: 'CUST_CODE', formControlName: 'GOIPCnsrCode' },
  { apiKey: 'CUST_NAME', formControlName: 'GOIPCnsrName' },
  { apiKey: 'DRVR_NAME', formControlName: 'GOIPdrivername' },
  { apiKey: 'GATE_INOUTTIME', formControlName: 'GOIPsupervisor' },
  
  { apiKey: 'GP_NUMB', formControlName: '' },
  { apiKey: 'HLPR_NAME', formControlName: 'GOIPhelpername' },
  { apiKey: 'ISSUE_TIME', formControlName: 'GOIPissuedOn' },
  { apiKey: 'JV_LOGIN', formControlName: '' },
  
  { apiKey: 'OPT_SLCT', formControlName: '' },
  { apiKey: 'PERMIT_NUMB', formControlName: '' },
  { apiKey: 'RFND_FLAG', formControlName: '' },
  { apiKey: 'RFND_NUMB', formControlName: '' },

  { apiKey: 'RMRK', formControlName: 'GOIPremarks' },
  { apiKey: 'STTN', formControlName: 'GIOPSttnFrm' },
  { apiKey: 'TA_HTTP_UNKNOWN_NAME', formControlName: '' },
  { apiKey: 'TRLR_NUMB', formControlName: 'GOIPtrailernumb' },
  
  { apiKey: 'TRMN_LOGIN', formControlName: '' },
  { apiKey: 'USER_LOGIN', formControlName: '' },
  { apiKey: 'VHCL_OWNEDBY', formControlName: 'GOIPloadername' },
  { apiKey: 'VHCL_TYPEFLAG', formControlName: 'GOIPsupervisor' },
  
  { apiKey: 'VLDT_UPTO', formControlName: 'GOIPvalidUpto' },
  { apiKey: 'WGHT', formControlName: 'GOIPvhclwght' },

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
  
  showConsignerDropdown = false;

filterConsignerList(value: string) {
  this.filteredConsigneeList = this.consigneeHelpData.filter(item =>
    item.p_CustCode.toLowerCase().includes(value.toLowerCase()) ||
    item.p_CustName.toLowerCase().includes(value.toLowerCase()) 
    
  );
}

selectConsigner(item: any) {
  this.selectedCnsrCode = item.p_CustCode;
  this.selectedCnsrName = item.p_CustName; // <-- storing the name

  // ✅ Set value into reactive form
  this.form.patchValue({
    GOIPCnsrCode: this.selectedCnsrCode,
    GOIPCnsrName: this.selectedCnsrName
  });

  this.showConsignerDropdown = false;
  
}

hideConsignerDropdownWithDelay() {
  setTimeout(() => {
    this.showConsignerDropdown = false;
  }, 200);
}

isGunnyBalesChecked: boolean = false;

toggleGunnyBales(event: Event): void {
  const checkbox = event.target as HTMLInputElement;
  this.isGunnyBalesChecked = checkbox.checked;
}


onSubmit() {
  const formValues = this.form.value;
  const issueDate = this.formatToDDMMYY(formValues.GIOPDate); // <-- conversion
  const timePart = '23:59'; // Set static time for demo; you can make it dynamic

  // Prepare the flat payload - SRVC at root level, no wrapping object
  const finalPayload = {
    SRVC: "CTGATEEMPT",
    ADDR: formValues.GOIPaddress,
    BACK_TRMLFLAG: "N",
    CMDT_CHKFLAG: "N",
    CRGO_CNTRFLAG: "C",
    CUST_CODE: formValues.GOIPCnsrCode,
    CUST_NAME: formValues.GOIPCnsrName,
    DRVR_NAME: formValues.GOIPdrivername,
    HLPR_NAME: formValues.GOIPhelpername,
    ISSUE_TIME: formValues.GOIPissuedOn,  // e.g. 'dd-MM-yy HH:mm'
    RFND_FLAG: "E",
    RMRK: formValues.GOIPremarks,
    STTN: formValues.GIOPSttnFrm,
    TRLR_NUMB: formValues.GOIPtrailernumb,
    USER_ID: "CRIS",
    VALD_FLAG: "", // If you have this value, set it here
    VHCL_OWNEDBY: "P",
    VHCL_TYPEFLAG: formValues.GOIPvhcltype,
    VLDT_UPTO: formValues.GOIPvalidUpto,
    WGHT: formValues.GOIPvhclwght,
    ICOUNT: "0",
    CHK_FLAG: "I",
    OPT_SLCT: "S",
    CNTR_CC: "", // Optional
    GATE_INOUTTIME: formValues.GOIPissuedOn, // same as ISSUE_TIME
    RFND_NUMB: "",
    PERMIT_NUMB: "",
    JV_LOGIN: "*",
    TRMN_LOGIN: formValues.GIOPSttnFrm,
    USER_LOGIN: "CRIS" ,
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


