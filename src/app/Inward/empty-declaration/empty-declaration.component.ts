import { AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Component,  OnInit,Input } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormControl, FormsModule} from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GateserviceService } from 'src/app/services/gateservice.service';
import { GatepassstoreserviceService } from 'src/app/services/gatepassstoreservice.service';
import { FormValidationService } from 'src/app/services/form-validation.service';

@Component({
  selector: 'app-empty-declaration',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './empty-declaration.component.html',
  styleUrls: ['./empty-declaration.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class EmptyDeclarationComponent implements OnInit  {
  
  @ViewChild('formWrapper', { static: false }) formWrapper!: ElementRef;
  fieldLabels: { [key: string]: string } = {};

  // Form-related properties
  form: any = {
    
  };

  invalidFields: string[] = [];
  filledStatus: { [key: string]: boolean } = {};



  

  
  currentDateTime: string = '';
  endOfDay: string = '';
  currentDate: string = '';




  

  constructor(private helpService: HelpService,private fb: FormBuilder, private router: Router,private gateservice:GateserviceService, private gatepasstore: GatepassstoreserviceService, public formValidator:FormValidationService) {
    this.form = this.fb.group({
    EMDCLsttnfrm: ['', Validators.required],
    EMDCLdate: ['', Validators.required],
    EMDCLctnrno: ['', Validators.required],
    EMDCLemDclDttm: ['', Validators.required],
    EMDCLcnsgId: ['', Validators.required],
    EMDCLctnrSFcode: ['', Validators.required],
    
  });
    
  }

  ngOnInit(): void {
  

  // Set today's date in yyyy-MM-dd format for input[type="date"]
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = (today.getMonth() + 1).toString().padStart(2, '0');
  const dd = today.getDate().toString().padStart(2, '0');
  const todayFormatted = `${yyyy}-${mm}-${dd}`;
  this.form.get('EMDCLdate')?.setValue(todayFormatted);

  this.currentDateTime = this.formatDateTimeLocal(today);
  

  const now = new Date();
const formattedNow = this.formatDateTimeLocal(now);
this.form.get('EMDCLemDclDttm')?.setValue(formattedNow);


  

}





  formFieldMappings = [
  { apiKey: 'ADDR', formControlName: 'EMDCLsttnfrm' },
  { apiKey: 'CHK_FLAG', formControlName: 'EMDCLdate' },
  { apiKey: 'CNSR_NAME', formControlName: 'EMDCLctnrno' },
  { apiKey: 'CNTR_CC', formControlName: 'EMDCLemDclDttm' },
  { apiKey: 'CRGO_CNTRFLAG', formControlName: 'EMDCLcnsgId' },
  { apiKey: 'CUST_CODE', formControlName: 'EMDCLctnrSFcode' },

 

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

// formatToDDMMYY(dateStr: string): string {
//   const [yyyy, mm, dd] = dateStr.split('-');
//   return `${dd}-${mm}-${yyyy.slice(2)}`;
// }

formatToDDMMYY(dateStr: string | undefined | null): string {
  if (!dateStr || typeof dateStr !== 'string') {
    return ''; // or handle as needed
  }

  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return ''; // malformed date
  }

  const [yyyy, mm, dd] = parts;
  return `${dd}-${mm}-${yyyy}`;
}

showPopup = false;

closePopup() {
  this.showPopup = false;
}

onSubmit() {

  this.formValidator.markAllFieldsTouched(this.form);
  this.invalidFields = this.formValidator.getInvalidFields(this.form);

  // Build filledStatus and trim invalidFields
  this.invalidFields = this.invalidFields.filter(field => {
    const isFilled = !!this.form.get(field)?.value;
    this.filledStatus[field] = isFilled;
    return !isFilled;
  });

  // Show popup if any invalid
  this.showPopup = this.invalidFields.length > 0;

  if (this.form.invalid) return;

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
    USER_LOGIN: "CRIS",
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


previewImages: string[] = [];
selectedFiles: File[] = [];

onFileSelect(event: any) { 
  const files: FileList = event.target.files;

  if (files.length + this.previewImages.length > 3) {
    alert("You can upload a maximum of 3 images.");
    return;
  }

  Array.from(files).forEach(file => {
    if (file.size < 2 * 1024 ) {
      alert(`Image "${file.name}" is less than 2MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewImages.push(e.target.result);
      this.selectedFiles.push(file);
    };
    reader.readAsDataURL(file);
  });

  // Reset the file input so same file can be re-uploaded after delete
  event.target.value = '';
}

removeImage(index: number) {
  this.previewImages.splice(index, 1);
  this.selectedFiles.splice(index, 1);
}


onInputChange(controlName: string) { 
  const control = this.form.get(controlName);
  const isEmptyOrInvalid = !control?.value || control.invalid;

  if (isEmptyOrInvalid) {
    // Add back if not already in list
    if (!this.invalidFields.includes(controlName)) {
      this.invalidFields.push(controlName);
    }
    this.filledStatus[controlName] = false;
  } else {
    this.filledStatus[controlName] = true;

    // Remove field from popup and border list
    this.invalidFields = this.invalidFields.filter(f => f !== controlName);
  }
}













  

  

  
  
}


