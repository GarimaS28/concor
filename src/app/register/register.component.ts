
import { Component, inject,ViewChild, ChangeDetectorRef,ElementRef,HostListener,OnInit } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CaptchaComponent } from '../captcha/captcha.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';

import { FormValidationService } from 'src/app/services/form-validation.service';
import { ValidationPopupComponent } from "src/app/Validators/Validations/validation-popup/validation-popup.component";

import { HelpService } from 'src/app/services/help.service';
import { LoaderComponent } from '../theme/shared/components/loader/loader.component';

import { DigitaltokenserviceService } from '../services/digitaltokenservice.service';
import { OtpService } from '../services/otp-service.service';
import { TokenData } from '../services/tokendata.model';
import { Console } from 'console';


interface FileUploadItem {
  label: string;
  uploaded: boolean;
  base64: string;
  file: File | null;
  fileURL?: string;
}
declare const getPKIData: any; // tells TypeScript this function exists globally


@Component({
  selector: 'app-register',
  imports: [SharedModule, RouterModule, FormsModule, RouterLink, CaptchaComponent,LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  
})


export class RegisterComponent implements OnInit {
  
  isLoading: boolean = false;

   @ViewChild('draggableModal') draggableModal!: ElementRef;
  @ViewChild('modalDialog') modalDialog!: ElementRef;
  @ViewChild('dragHandle') dragHandle!: ElementRef;
  @ViewChild(CaptchaComponent) captchaComponent!: CaptchaComponent; // Reference to CAPTCHA component

  @ViewChild('formWrapper', { static: false }) formWrapper!: ElementRef;

  invalidFields: string[] = [];
  filledStatus: { [key: string]: boolean } = {};

  terminals: string[] = [];
  businessTypes: string[] = [];
  states: string[] = [];

  filteredTerminals: string[] = [];
  filteredStates: string[] = [];

isMobileVerified: any;
isEmailVerified: any;


         TrmnlDataTO: any[]= [];
filteredStationToList: any[] = [];

StateData: any[]= [];
filteredStateList: any[] = [];


BusnsTypeData: any[]= [];
filteredBusnsTypeList: any[] = [];

uploadedFiles: (File | null)[] = [null, null, null, null, null]; 

isForeignCountry: boolean = false;
tradeNameMaxLength = 50;



ngOnInit(): void {

      this.helpService.TrmnlCodeTo$.subscribe(data => {
      if (data?.result) {
      this.TrmnlDataTO = data.result;
      this.filteredStationToList = [...this.TrmnlDataTO]; 
      }
      });

      this.helpService.state$.subscribe(data => {
      if (data?.result) {
      this.StateData = data.result;
      this.filteredStateList = [...this.StateData]; 
      }
      });

      this.helpService.BusnsType$.subscribe(data => {
      if (data?.result) {
      this.BusnsTypeData = data.result;
      this.filteredBusnsTypeList = [...this.BusnsTypeData]; 
      }
      });

      this.form.get('rgstcountry')?.valueChanges.subscribe((country: string) => {
    this.updateStatePinStatus(country);
  });

  this.form.get('typeBsns')?.valueChanges.subscribe((val: string) => {
    this.handleBusinessTypeChange(val);
    if (val) {
      this.onBusinessTypeChange(val);
    }
  });


  // Subscribe to First Name & Last Name changes
  this.form.get('rgstfname')?.valueChanges.subscribe(() => this.updatePartyName());
  this.form.get('rgstlname')?.valueChanges.subscribe(() => this.updatePartyName());

}

 

  ngOnDestroy() {
  
  this.clearCountdown();
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

/*******************HELP ************** */





  currentStep = 1;
  progress = 0;
  form: FormGroup;


  imageSrc = 'assets/images/2927339-Photoroom.png';
  isModalOpen = false;
  hideUploadTrigger = false;
  allFilesUploaded = false;

  fileUploads :FileUploadItem[]= [
    { label: 'Authorization Letter', uploaded: false, base64: '' , file: null},
    { label: 'Registration Certificate', uploaded: false, base64: '' , file: null},
    { label: 'GSTN No', uploaded: false, base64: '' , file: null},
    { label: 'PAN No', uploaded: false, base64: '' , file: null},
    { label: 'Aadhar No', uploaded: false, base64: '' , file: null },
    { label: 'Tan No', uploaded: false, base64: '' , file: null },
    { label: 'Partnership Deed', uploaded: false, base64: '' , file: null },
    { label: 'Others', uploaded: false, base64: '' , file: null },
  ];
i: any;



  constructor(private cdr: ChangeDetectorRef,private fb: FormBuilder, private authService: AuthserviceService,private helpService: HelpService, private router: Router, private cdRef:ChangeDetectorRef, public formValidator:FormValidationService, private HelpService:HelpService,private digitalTokenService: DigitaltokenserviceService,private OtpService: OtpService,private http: HttpClient) {

    const now = new Date();
  const formattedDate = this.formatDate(now);

  this.form = this.fb.group({
    RqstDate: [formattedDate, Validators.required],
    TmnlCode: ['', Validators.required],
    typeBsns: ['', Validators.required],
    userRole: ['', Validators.required],

    prtyname: ['', Validators.required],
    tradename: ['', Validators.required],
    Cmpnyname: ['', Validators.required],
    rgstfname: ['', Validators.required],
    rgstmname: [''],
    rgstlname: ['', Validators.required],
    rgstadrs: ['', Validators.required],
    rgstpcode: ['', Validators.required],
    rgstcountry: ['', Validators.required],
    rgstcity: ['', Validators.required],
    rgststate: ['', Validators.required],
    rgstmobno: ['', Validators.required],
    rgstemail: ['', Validators.required],
    Authnumb: ['', Validators.required],
    Pannumb: ['', Validators.required],
    Aadharnumb: ['', Validators.required],
    Gstnumb: ['', Validators.required],
    CpdalLinkFlag: ['Y', Validators.required],
    NotifyId: ['ABCDSTTN', Validators.required],
    ApproveFlag: ['N', Validators.required],
    SuperId: ['ABCD1234', Validators.required],
    otpmobile: [''],
    otpemaill: [''],
    aadharOtp: [''],
    RgstCerf: [''],
    PtnrspDeed: [''],
    Tannumb: [''],
    OtherDocs: [''],
  });
  }





  

  private formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return (
      `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear().toString().slice(-2)} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    );
  }

  

  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
      this.updateProgress();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
    this.updateProgress();
  } 

  updateProgress() {
    this.progress = ((this.currentStep - 1) / 2) * 100;
  }

//   removeFile(index: number) {
//   // Remove from uploadedFiles
//   this.uploadedFiles[index] = null;

//   // Also reset tracking for fileUploads
//   if (this.fileUploads[index]) {
//     this.fileUploads[index].uploaded = false;
//     this.fileUploads[index].file = null;
//   }

//   // Optional: clear the form control if it's one of the first four
//   const fieldNames = ['Authnumb', 'Aadharnumb', 'Pannumb', 'Gstnumb'];
//   if (index < 4 && this.form.get(fieldNames[index])) {
//     this.form.get(fieldNames[index])?.setValue('');
//   }
// }

removeFile(index: number) {
  // Remove from uploadedFiles
  this.uploadedFiles[index] = null;

  // Also reset tracking for fileUploads
  if (this.fileUploads[index]) {
    this.fileUploads[index].uploaded = false;
    this.fileUploads[index].file = null;
    this.fileUploads[index].base64 = '';
    this.fileUploads[index].fileURL = '';
  }

  // Clear form control if it's one of the first four
  const fieldNames = ['Authnumb', 'Aadharnumb', 'Pannumb', 'Tannumb', 'Gstnumb', 'RgstCerf', 'PtnrspDeed', 'OtherDocs'];
  if (index < 8 && this.form.get(fieldNames[index])) {
    this.form.get(fieldNames[index])?.setValue('');
  }

  // ✅ Reset file input (forces re-trigger on same file upload)
  const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
  if (fileInputs[index]) {
    fileInputs[index].value = '';
  }
}



  // 🧠 Converts File to base64 and updates array
 handleFileUpload(event: any, index: number): void {
  const fileInput = event.target as HTMLInputElement;
  const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFiles[index] = input.files[0];
    }

  const file = fileInput.files?.[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed!');
      fileInput.value = '';
      return;
    }

    if (file.size > maxSizeInBytes) {
      alert(`File size should not exceed ${maxSizeInMB} MB.`);
      fileInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.fileUploads[index].base64 = base64;
      this.fileUploads[index].uploaded = true;
      this.fileUploads[index].file = file;
      this.fileUploads[index].fileURL = fileURL;
      this.checkAllFilesUploaded();
    };
    reader.readAsDataURL(file);
  }
}




  checkAllFilesUploaded() {
    this.allFilesUploaded = this.fileUploads.every(file => file.uploaded);
    // if (this.allFilesUploaded) {
    //   this.imageSrc = 'assets/images/10265235.jpg';
    // }
  }

  deleteUploadedFile(index: number, fileInput: HTMLInputElement): void {
    this.fileUploads[index].uploaded = false;
    this.fileUploads[index].base64 = '';
    fileInput.value = '';
    this.checkAllFilesUploaded();
  }

  // allDocumentsUploaded(): boolean {
  //   return this.fileUploads.every(file => file.uploaded);
  // }

//   allDocumentsUploaded(): boolean {
//   // First four must have both number + PDF
//   for (let i = 0; i < 4; i++) {
//     const fieldNames = ['Authnumb', 'Aadharnumb', 'Pannumb', 'Gstnumb'];
//     const numberValue = this.form.get(fieldNames[i])?.value?.trim();
//     if (!numberValue || !this.fileUploads[i].uploaded) {
//       return false;
//     }
//   }

//   // Fifth (Registration Certificate) → only PDF mandatory
//   if (!this.fileUploads[4].uploaded) {
//     return false;
//   }

//   return true;
// }

getMissingDocuments(): string[] {
  const missing: string[] = [];
  const fieldNames = {
    Authnumb: 'AUTH',
    Aadharnumb: 'ADHR',
    Pannumb: 'PAN',
    Tannumb: 'TAN',
    Gstnumb: 'GSTN',
    RgstCerf: 'REGC',
    PtnrspDeed: 'PTNR',
    OtherDocs: 'OTHR'
  };

  for (const [controlName, flagKey] of Object.entries(fieldNames)) {
    if (this.docFlags[flagKey] === 'Y') {
      const numberValue = this.form.get(controlName)?.value?.trim();
      const index = Object.keys(fieldNames).indexOf(controlName);

      if (!numberValue || !this.fileUploads[index]?.uploaded) {
        missing.push(controlName); // collect missing docs
      }
    }
  }

  return missing;
}



// async fetchToken() {
//   return await this.digitalTokenService.readTokenData();
// }


signedDocs: any = {
  aadhar: false,
  authletter: false,
  pancard: false,
  gstn: false,
  tannumb: false,
  partnershipdeed: false,
  compregncert: false,
  others: false
};

async fetchToken() {
  try {
    // Step 1: Fetch digital token details
    const tokenData = await this.digitalTokenService.readTokenData();
    console.log("Digital token fetched:", tokenData);

    // Step 2: Ask for confirmation
    const confirmSign = confirm("Do you want to sign all your documents digitally?");
    if (confirmSign) {
      this.signAllDocuments(tokenData);
    }
  } catch (err) {
    console.error("Error fetching token", err);
    alert("Failed to fetch digital token.");
  }
}

signAllDocuments(token: any) {
  // Step 3: Call signing logic / API here
  // For now, we just mark all docs as signed
  Object.keys(this.signedDocs).forEach(key => {
    this.signedDocs[key] = true;
  });

  alert("All documents have been digitally signed ✅");
}

formatDate1(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('/'); // ["dd","mm","yyyy"]
  if (parts.length !== 3) return dateStr;

  const dd = parts[0];
  const mm = parts[1];
  const yy = parts[2].slice(-2); // take last 2 digits of year

  return `${dd}-${mm}-${yy}`;
}


async onSubmit() {
  // ✅ Step 1: Validate Captcha
  this.captchaComponent.validateCaptcha();
  if (!this.captchaComponent.isValid) return;

  // ✅ Step 2: Mark touched + track invalid fields
  this.formValidator.markAllFieldsTouched(this.form);
  this.invalidFields = this.formValidator.getInvalidFields(this.form);
  this.invalidFields.forEach(field => {
    const value = this.form.get(field)?.value;
    this.filledStatus[field] = !!value;
  });

  if (this.form.invalid) {
    alert('❌ Please fix form errors before submitting.');
    return;
  }

  // ✅ Step 3: Normalize string inputs to uppercase
  Object.keys(this.form.controls).forEach(key => {
    const control = this.form.get(key);
    if (control && typeof control.value === 'string') {
      control.setValue(control.value.toUpperCase());
    }
  });

  // ✅ Step 4: Ensure docs are uploaded
  const missingDocs = this.getMissingDocuments();
if (missingDocs.length > 0) {
  alert("Please upload mandatory documents: " + missingDocs.join(", "));
} 

  try {
    // 🔐 Step 5: Trigger PKI signing and read token
    const tokenData: any = await this.fetchToken(); // Fetch digital token data
    console.log('🔐 PKI Token Data:', tokenData);

    if (!tokenData?.serialNumber) {
      alert('❌ No digital token found or user cancelled.');
      return;
    }

    // ✅ Step 6: Build request data (form + PKI details)
    const formValues = this.form.value;
    const jsonRequestData = {
      p_rqstdate: formValues.RqstDate,
      p_rqsttrmn: formValues.TmnlCode,
      p_businesstype: formValues.typeBsns,
      p_partyname: formValues.prtyname,
      p_custfname: formValues.rgstfname,
      p_custmname: formValues.rgstmname,
      p_custlname: formValues.rgstlname,
      p_address: formValues.rgstadrs,
      p_pincode: formValues.rgstpcode,
      p_city: formValues.rgstcity,
      p_state: formValues.rgststate,
      p_mobile: formValues.rgstmobno,
      p_email: formValues.rgstemail,
      p_authletternumb: formValues.Authnumb,
      p_pannumb: formValues.Pannumb,
      p_tannumb: formValues.Tannumb,
      p_aadharnumb: formValues.Aadharnumb,
      p_tradename: formValues.tradename,
      p_gstnumb: formValues.Gstnumb,
      p_cpdalinkflag: formValues.CpdalLinkFlag,
      p_notifyid: formValues.NotifyId,
      p_approveflag: formValues.ApproveFlag,
      p_superid: formValues.SuperId,
      pki_serialNumber: tokenData.serialNumber,
      pki_cnName: tokenData.cnName,
      pki_thumbprint: tokenData.thumbprint,
      // pki_validFrom: tokenData.validFrom,
      // pki_validTo: tokenData.validTo,
      pki_validFrom: this.formatDate1(tokenData.validFrom),
    pki_validTo: this.formatDate1(tokenData.validTo),

      
      // p_company: formValues.SuperId,
      // p_country: formValues.SuperId,

      
    };
    

    // ✅ Step 7: Build document base64 map
    const jsonDocumentData: any = {};
    this.fileUploads.forEach(file => {
      const key = this.mapFileLabelToApiKey(file.label);
      console.log("Rishabh 1 "+key);
      jsonDocumentData[key] = file.base64.replace(/^data:.*;base64,/, '');
    });

    // ✅ Step 8: Final payload
    const finalPayload = { jsonRequestData, jsonDocumentData };
    console.log('📦 Final Payload:', finalPayload);

    // ✅ Step 9: Submit API request
    this.isLoading = true;
    // this.authService.submitCustomerForm(JSON.stringify(finalPayload)).subscribe({
    //   next: (res) => {
    //     console.log('✅ Submitted successfully', res);
    //     this.isLoading = false;
    //     //alert('✅ Registration submitted successfully!');
    //     // Optionally navigate
    //     this.router.navigate(['/homesuccessstat']);
    //   },
    //   error: (err) => {
    //     console.error('❌ Submission failed', err);
    //     this.isLoading = false;
    //     //alert('❌ Submission failed. Please try again.');
    //      this.router.navigate(['/homefailedstat']);
    //   }
    // });

    this.authService.submitCustomerForm(JSON.stringify(finalPayload)).subscribe({
  next: (res: any) => {
    console.log('✅ Submitted successfully', res);
    this.isLoading = false;

    if (res.status && res.status.toUpperCase() === 'SUCCESS') {
      // extract requestId from message
      const message: string = res.message || '';
      let requestId = '';

      // Extract everything after "custReqId="
      const match = message.match(/custReqId=([A-Z0-9]+)/);
      if (match && match[1]) {
        requestId = match[1];
      }

      // Navigate to success component, passing requestId
      this.router.navigate(['/homesuccessstat'], { state: { requestId } });
    } else {
      this.router.navigate(['/homefailedstat']);
    }
  },
  error: (err) => {
    console.error('❌ Submission failed', err);
    this.isLoading = false;
    this.router.navigate(['/homefailedstat']);
  }
});


  } catch (err) {
    console.error('❌ PKI Error:', err);
    alert('Could not fetch PKI details. Please ensure your PKI token is connected.');
  }
}


  mapFileLabelToApiKey(label: string): string {
    switch (label) {
      case 'Authorization Letter': return 'p_authletter';
      case 'Registration Certificate': return 'p_compregncert';
      case 'GSTN No': return 'p_gstn';
      case 'PAN No': return 'p_pancard';
      case 'Aadhar No': return 'p_aadhar';
      case 'Tan No': return 'p_tannumb';
      case 'Partnership Deed': return 'p_partnershipdeed';
      case 'Others': return 'p_others';
      default: return '';
    }
  }
  
 

onAlphaOnlyEM(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Za-z.@0-9]/g, '');
  
}

onAlphaOnly(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Za-z]/g, '');
  
}

onAlphaOnlysp(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Za-z ]/g, '');
  
}

onNumericOnly(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^0-9]/g, '');
  
}

onAlphaNumericOnly(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Z0-9. ]/g, '');
}


showNumericWarning2: boolean = false;

onAlphaOnly2(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  let value = inputElement.value.toUpperCase();
  inputElement.value = value;

  const hasDigit = /\d/.test(value);
  this.showNumericWarning2 = hasDigit;
}





uploadedDetails: {
  Authnumb?: string;
  Gstnumb?: string;
  Pannumb?: string;
  Aadharnumb?: string;
  files: { label: string; name: string; url?: string | null }[]; // ✅ Add url field
} = {
  files: []
};


resetForm() {
  this.form.reset();
  this.uploadedDetails = { files: [] };
  this.fileUploads.forEach(f => {
    f.uploaded = false;
    f.file = null;
  });
  this.hideUploadTrigger = false;

}

  onPanInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  let value = input.value.toUpperCase();

  let result = '';

  // Go character by character
  for (let i = 0; i < value.length && result.length < 10; i++) {
    const char = value[i];

    if (result.length < 5) {
      // First 5 characters: only letters allowed
      if (/[A-Z]/.test(char)) {
        result += char;
      }
    } else if (result.length < 9) {
      // Next 4 characters: only digits allowed
      if (/[0-9]/.test(char)) {
        result += char;
      }
    } else if (result.length === 9) {
      // Last character: only letter allowed
      if (/[A-Z]/.test(char)) {
        result += char;
      }
    }
  }

  // Set the cleaned & valid value back
  input.value = result;

  // Optionally update validation tracking
  //this.onInputChange('Pannumb');
}

gstin: string = '';
gstinValid: boolean = true;
gstinTouched: boolean = false;

onGSTINInput(event: Event): void {
  this.gstinTouched = true;

  const inputElement = event.target as HTMLInputElement;
  const rawValue = inputElement.value.toUpperCase();
  const pan = this.form.get('Pannumb')?.value?.toUpperCase() || '';
  let cleanedValue = '';

  for (let i = 0; i < rawValue.length && cleanedValue.length < 15; i++) {
    const char = rawValue[i];

    if (i < 2) {
      // 1–2: Digits
      if (/[0-9]/.test(char)) {
        cleanedValue += char;
      }
    } else if (i >= 2 && i < 12) {
      // 3–12: must match PAN
      if (pan.length === 10) {
        const panChar = pan[i - 2];
        if (char === panChar) {
          cleanedValue += char;
        }
      }
    } else if (i === 12) {
      // 13th: A–Z
      if (/[A-Z]/.test(char)) {
        cleanedValue += char;
      }
    } else if (i === 13) {
      // 14th: A–Z or 0–9
      if (/[A-Z0-9]/.test(char)) {
        cleanedValue += char;
      }
    } else if (i === 14) {
      // 15th: Z
      if (char === 'Z') {
        cleanedValue += char;
      }
    }
  }

  this.gstin = cleanedValue;
  inputElement.value = cleanedValue; // force-correct in input box
  this.form.get('Gstnumb')?.setValue(cleanedValue, { emitEvent: false });

  // Validate final result only if it's 15 chars
  this.gstinValid = cleanedValue.length === 15;

  this.onInputChange('Gstnumb');
}


  private countdownInterval: any;

  // Close modal on clicking outside content
  closeOnBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeOtpModal();
    }
  }

  

 
  startCountdown() {
    this.countdown = 59;
    this.clearCountdown();
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.clearCountdown();
      }
    }, 1000);
  }

  clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }



  // STTN TO dropdown handling
selectedStationToCode: string = '';
showStationToDropdown: boolean = false;

// Reuse or fetch stationList from API/service if not already
stationList: any[] = []; // Should already be filled with station data like [{ p_TrmnCode: 'NDLS', ... }]

filterStationToList(search: string) {
 
    if (!search) {

    this.filteredStationToList = [...this.TrmnlDataTO];
    return;
  }
  this.filteredStationToList = this.TrmnlDataTO.filter(station =>
    station.p_TrmnCode.toLowerCase().includes(search.toLowerCase())
  );
}


selectStationToCode(station: any) {

  this.selectedStationToCode = station.p_TrmnCode;
  this.form.get('TmnlCode')?.setValue(station.p_TrmnCode);
  this.showStationToDropdown = false;


}

hideStationToDropdownWithDelay() {
  setTimeout(() => {
    this.showStationToDropdown = false;
  }, 200); // Allow click to register
}


onStationToInputChange(event: any) {

  const value = event.target.value.toUpperCase().replace(/[^A-Z]/g, ''); // allow only letters
  this.selectedStationToCode = value;
  this.filterStationToList(value);
  this.form.get('TmnlCode')?.setValue(value);
}

// Validate input after blur or form submission
validateStationToInput() {
 const enteredCode = this.selectedStationToCode.trim().toUpperCase();

  const isValid = this.TrmnlDataTO.some(
    station => station.p_TrmnCode === enteredCode
  );

  if (!isValid) {
    
    // Clear the value
    this.selectedStationToCode = '';
    this.form.get('TmnlCode')?.setValue('');

    // Force validation class to show red by touching the field
    this.form.get('TmnlCode')?.markAsTouched();
    this.form.get('TmnlCode')?.markAsDirty();
  }
}

/**************State *********/



  // State dropdown handling
selectedStateCode: string = '';
showStateDropdown: boolean = false;

// Reuse or fetch stationList from API/service if not already
stateList: any[] = []; // Should already be filled with station data like [{ p_TrmnCode: 'NDLS', ... }]

filterStateList(search: string) {
 if (!search) {
console.log("Rishabh 2");
console.log("Rishabh 3",this.filteredStateList);
    this.filteredStateList = [...this.StateData];
    return;
  }
  this.filteredStateList = this.StateData.filter(state =>
    state.p_StateName.toLowerCase().includes(search.toLowerCase())
  );
}


selectStateCode(state: any) {console.log("Rishabh 4");
  this.selectedStateCode = state.p_StateName;
  console.log("Rishabh 5",this.selectedStateCode);
  this.form.get('rgststate')?.setValue(state.p_StateName);
  this.showStateDropdown = false;


}

hideStateDropdownWithDelay() {
  
  setTimeout(() => {
    this.showStateDropdown = false;
  }, 200); // Allow click to register
}


onStateInputChange(event: any) {
  
  const value = event.target.value.toUpperCase().replace(/[^A-Z]/g, ''); // allow only letters
  this.selectedStateCode = value;
  this.filterStateList(value);
  this.form.get('rgststate')?.setValue(value);
}

// Validate input after blur or form submission
validateStateInput() {
  
 const enteredCode = this.selectedStateCode.trim().toUpperCase();

  const isValid = this.StateData.some(
    state => state.p_StateName === enteredCode
  );

  if (!isValid) {
    // Clear the value
    this.selectedStateCode = '';
    this.form.get('rgststate')?.setValue('');

    // Force validation class to show red by touching the field
    this.form.get('rgststate')?.markAsTouched();
    this.form.get('rgststate')?.markAsDirty();
  }
}







get mobileNumberValid(): boolean {
  const mob = this.form.get('rgstmobno')?.value;
  return mob && mob.toString().length === 10;
}




// --- Email OTP modal state ---
showemailOtpModal = false;
enteredemail: string = '';
otpemailStatus: 'idle' | 'success' | 'error' = 'idle';
emailVerified = false; // final flag

// constant correct OTP
correctEmailOtp = '958282';

openemailOtpModal() {
  this.enteredemail = this.form.get('rgstemail')?.value;
  this.otpemailStatus = 'idle';
  this.showemailOtpModal = true;
}

closeemailOtpModal() {
  this.showemailOtpModal = false;
}

validateemailOtp() {
  const otpValue = this.form.get('otpemaill')?.value;
  if (otpValue?.length === 6) {
    this.otpemailStatus = otpValue === this.correctEmailOtp ? 'success' : 'error';
  } else {
    this.otpemailStatus = 'idle';
  }
}

confirmemailOtp() {
  if (this.otpemailStatus === 'success') {
    this.emailVerified = true;   // mark as verified
    this.closeemailOtpModal();
  }
}

// Helper: email format check
get emailValid(): boolean {
  const email = this.form.get('rgstemail')?.value;
  return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// Aadhaar verification state
showAadharOtpModal = false;
enteredAadhar: string = '';
aadharOtpStatus: 'idle' | 'success' | 'error' = 'idle';
aadharVerified = false;

correctAadharOtp = '723456';  // your fixed OTP

openAadharOtpModal() {
  this.enteredAadhar = this.form.get('Aadharnumb')?.value;
  this.aadharOtpStatus = 'idle';
  this.showAadharOtpModal = true;
}

closeAadharOtpModal() {
  this.showAadharOtpModal = false;
}

validateAadharOtp() {
  const otpValue = this.form.get('aadharOtp')?.value;
  if (otpValue?.length === 6) {
    this.aadharOtpStatus = otpValue === this.correctAadharOtp ? 'success' : 'error';
  } else {
    this.aadharOtpStatus = 'idle';
  }
}

confirmAadharOtp() {
  if (this.aadharOtpStatus === 'success') {
    this.aadharVerified = true;
    this.closeAadharOtpModal();
  }
}

// Helper: Aadhaar validity check (12 digits only)
get aadharValid(): boolean {
  const val = this.form.get('Aadharnumb')?.value;
  return !!val && /^\d{12}$/.test(val);
}




/******************* OTP Validation ******************* */
// OTP Flow
showOtpModal = false;
otpStatus: 'pending' | 'success' | 'error' | 'expired' | null = null;
countdown = 0;
private timer: any;

otpHash: string | null = null;
otpTimestamp: number | null = null;
validityPeriod = 120; // seconds
enteredMobile = '';
mobileVerified = false;



/** Open OTP modal & send OTP */
openOtpModal() {
  this.enteredMobile = this.form.value.rgstmobno;
  console.log("📱 Mobile:", this.enteredMobile);

  // Pass custom values here 👇
  const otpCode = 'D_OTP';
  const otpPurpose = 'Login1';

  this.OtpService.sendOtp(this.enteredMobile, otpCode, otpPurpose).subscribe({
    next: (res) => {
      console.log('✅ OTP Sent Response:', res);
      this.otpHash = res?.otp_data?.hash;
      this.otpTimestamp = res?.otp_data?.timestamp;
      this.otpStatus = null;

      this.startTimer();
      this.showOtpModal = true;
    },
    error: (err) => {
      console.error('❌ Failed to send OTP', err);
      alert('Failed to send OTP. Please try again.');
    }
  });
}


/** Timer */
startTimer() {
  this.countdown = this.validityPeriod;
  if (this.timer) clearInterval(this.timer);

  this.timer = setInterval(() => {
    this.countdown--;
    if (this.countdown <= 0) {
      clearInterval(this.timer);
      this.otpStatus = 'expired';
    }
  }, 1000);
}

clearTimer() {
  if (this.timer) {
    clearInterval(this.timer);
    this.timer = null;
  }
}

/** Resend OTP */
resendOtp() {
  this.openOtpModal();
}

onOtpInput(event: any) {
  const otp = event.target.value;
  if (otp.length === 6) {
    this.validateOtp(otp); // pass OTP here
  }
}

/** Verify OTP */
validateOtp(otp: string) {
  if (otp?.length === 6 && this.otpHash && this.otpTimestamp) {
    this.OtpService.verifyOtp(this.enteredMobile, otp, 2, this.otpHash, this.otpTimestamp).subscribe({
      next: (res) => {
        console.log('✅ OTP Verify Response:', res);
        
        if (res?.verified === true) {   // ✅ boolean check
          this.otpStatus = 'success';
        } else {
          this.otpStatus = 'error';
        }
      },
      error: (err) => {
        console.error('❌ OTP verification failed', err);
        this.otpStatus = 'error';
      }
    });
  }
}


/** Confirm OTP */
confirmOtp() {
  this.mobileVerified = true;
  this.showOtpModal = false;
  this.form.get('rgstmobno')?.disable();
}

/** Close Modal */
closeOtpModal() {
  this.showOtpModal = false;
  this.clearTimer();
}



 tokenData: TokenData | null = null;
  errorMsg: string = '';

 

  readToken() {
    this.tokenData = null;
    this.errorMsg = '';
    //alert("1234");
    this.digitalTokenService.readTokenData()
      .then(data => this.tokenData = data)
      .catch(err => this.errorMsg = err);
  }

  onCountryChange(event: any) {
  const country = event.target.value;
  this.updateStatePinStatus(country);
}

updateStatePinStatus(country: string) {
  if (country === 'Nepal' || country === 'Bangladesh') {
    this.isForeignCountry = true;
    this.form.get('rgststate')?.disable();
    this.form.get('rgstpcode')?.disable();
  } else {
    this.isForeignCountry = false;
    this.form.get('rgststate')?.enable();
    this.form.get('rgstpcode')?.enable();
  }
}



handleBusinessTypeChange(val: string): void {
  if (val === 'INDIVIDUAL') {
    // Make Party Name readonly
    this.form.get('prtyname')?.disable();

    // Combine First + Last name into Party Name
    this.updatePartyName();

    // Company Name disabled
    this.form.get('Cmpnyname')?.disable();

    // Trade Name optional
    this.form.get('tradename')?.clearValidators();
    this.form.get('tradename')?.updateValueAndValidity();
    this.tradeNameMaxLength = 50;

  } 
  else if (val === 'COMPANY') {
    // Party Name, Trade Name, Company Name are required
    this.form.get('prtyname')?.enable();
    this.form.get('Cmpnyname')?.enable();
    this.form.get('tradename')?.enable();

    this.form.get('prtyname')?.setValidators([Validators.required]);
    this.form.get('Cmpnyname')?.setValidators([Validators.required]);
    this.form.get('tradename')?.setValidators([Validators.required]);

    this.form.get('prtyname')?.updateValueAndValidity();
    this.form.get('Cmpnyname')?.updateValueAndValidity();
    this.form.get('tradename')?.updateValueAndValidity();
    this.tradeNameMaxLength = 130;

  }  
  else if (val === 'PARTNERSHIP' || 'PARTNERSHIP LLP') {
    // Party Name, Trade Name, Company Name are required
    this.form.get('prtyname')?.enable();
    this.form.get('Cmpnyname')?.enable();
    this.form.get('tradename')?.enable();

    this.form.get('prtyname')?.setValidators([Validators.required]);
    this.form.get('Cmpnyname')?.setValidators([Validators.required]);
    this.form.get('tradename')?.setValidators([Validators.required]);

    this.form.get('prtyname')?.updateValueAndValidity();
    this.form.get('Cmpnyname')?.updateValueAndValidity();
    this.form.get('tradename')?.updateValueAndValidity();
    this.tradeNameMaxLength = 130;

  } 
  else if (val === 'PROPRIETORSHIP WITH INDIVIDUAL') {
    // Party Name, Trade Name, Company Name are required
    this.form.get('prtyname')?.disable();
    this.form.get('Cmpnyname')?.disable();
    this.form.get('tradename')?.enable();

    // this.form.get('prtyname')?.setValidators([Validators.required]);
    // this.form.get('Cmpnyname')?.setValidators([Validators.required]);
    this.form.get('tradename')?.setValidators([Validators.required]);

    // this.form.get('prtyname')?.updateValueAndValidity();
    // this.form.get('Cmpnyname')?.updateValueAndValidity();
    this.form.get('tradename')?.updateValueAndValidity();
    this.tradeNameMaxLength = 130;

  } 
  else {
    // Other business types
    this.form.get('prtyname')?.enable();   // Party Name editable
    this.form.get('Cmpnyname')?.enable();   // Company Name editable

    // Trade Name required
    this.form.get('tradename')?.setValidators([Validators.required]);
    this.form.get('tradename')?.updateValueAndValidity();
  }
}

// Combine First + Last Name into Party Name
updatePartyName(): void {
  const type = this.form.get('typeBsns')?.value;
  if (type === 'INDIVIDUAL') {
    const firstName = this.form.get('rgstfname')?.value || '';
    const lastName = this.form.get('rgstlname')?.value || '';
    this.form.get('prtyname')?.setValue((firstName + ' ' + lastName).trim());
  }
  if (type === 'PROPRIETORSHIP WITH INDIVIDUAL') {
    const firstName = this.form.get('rgstfname')?.value || '';
    const lastName = this.form.get('rgstlname')?.value || '';
    this.form.get('tradename')?.setValue((firstName + ' ' + lastName).trim());
  }
}


docFlags: any = {
  PAN: 'Y',
  ADHR: 'Y',
  GSTN: 'Y',
  REGC: 'Y',
  AUTH: 'Y',
  PTNR: 'Y',
  TAN: 'Y'
};

// onBusinessTypeChange(selectedType: string) {
//   const payload = {
//     HELP_TAG: "DOC_RQRD",
//     BUSS_TYPE: selectedType
//   };

//   this.http.post("http://172.16.4.69:9102/help/getHelpNew", payload).subscribe((res: any) => {
//     console.log("📩 API Response:", res);

//     // Reset flags
//     this.docFlags = {
//       PAN: 'N',
//       ADHR: 'N',
//       GSTN: 'N',
//       REGC: 'N',
//       AUTH: 'N',
//       PTNR: 'N'
//     };

//     // Map DOC_TYPE with MON_FLAG
//     if (res.DOC_TYPE && res.MON_FLAG) {
//       res.DOC_TYPE.forEach((doc: string, index: number) => {
//         this.docFlags[doc] = res.MON_FLAG[index];  // 'Y' or 'N'
//       });
//     }

//     console.log("✅ Updated docFlags:", this.docFlags);
//   });
// }

onBusinessTypeChange(selectedType: string) {
  const payload = {
    HELP_TAG: "DOC_RQRD",
    BUSS_TYPE: selectedType
  };

  this.http.post("http://172.16.4.69:9105/help/getHelpNew", payload).subscribe((res: any) => {
    console.log("📩 API Response:", res);

    // Create fresh flags object
    const updatedFlags: any = {
      PAN: 'Y',
      ADHR: 'Y',
      GSTN: 'Y',
      REGC: 'Y',
      AUTH: 'Y',
      PTNR: 'Y',
      TAN: 'Y'
    };

    if (res.DOC_TYPE && res.MON_FLAG) {
      res.DOC_TYPE.forEach((doc: string, index: number) => {
        updatedFlags[doc] = res.MON_FLAG[index];  // assign Y or N
      });
    }

    // Replace reference (important!)
    this.docFlags = { ...updatedFlags };

    Object.keys(this.docFlags).forEach(key => {
      const ctrl = this.form.get(this.mapDocToFormControl(key));
      if (ctrl) {
        this.docFlags[key] === 'N'
          ? ctrl.disable({ emitEvent: false })
          : ctrl.enable({ emitEvent: false });
      }
    });

    this.cdr.detectChanges();
    console.log("✅ Updated docFlags:", this.docFlags);
  });
}

mapDocToFormControl(doc: string): string {
  const map: any = {
    PAN: 'Pannumb',
    ADHR: 'Aadharnumb',
    GSTN: 'Gstnumb',
    REGC: 'RgstCerf',     // change to your actual control name
    AUTH: 'Authnumb',
    PTNR: 'PtnrspDeed',
    TAN: 'Tannumb'
  };
  return map[doc] || '';
}






  

}

