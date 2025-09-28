
import { Component,  OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GateserviceService } from 'src/app/services/gateservice.service';
import { GatepassstoreserviceService } from 'src/app/services/gatepassstoreservice.service';
@Component({
  selector: 'app-job-order',
  standalone: true,
  imports: [SharedModule, FormsModule,],
  templateUrl: './job-order.component.html',
  styleUrl: './job-order.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class JobOrderOutwardComponent implements OnInit {

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

    selectedCgneCode: string = '';
    selectedCgneName: string = '';

    customerIdHelpData: any[] = [];
    filteredCustomerIdList: any[] = [];
    selectedCustomerId: string = '';

    currentDateTime: string = '';
    endOfDay: string = '';
    currentDate: string = '';

   isLoadingSelected = false;
  isUnloadingSelected = false;









  Object: any;

    constructor(private helpService: HelpService,private fb: FormBuilder, private router: Router,private gateservice:GateserviceService,private gatepasstore: GatepassstoreserviceService) {
        this.form = this.fb.group({
        JBODSttnFrm: [''],
        JBODCurrDate: [''],
        JBODTrlrOwnr: ['C'],
        JBODCtnrOwnr: [''],
        JBODCustType: ['T'],
        JBODwkOdrno: [''],
        JBODjbOdrno: [''],
        JBODissueDT: [''],
        JBODhndlctnrcd: [''],
        JBODtnptctnrcd: [''],
        JBODtrlrno: [''],
        JBODcnIdPrno: [''],
        JBODbnGtCucode: [''],
        JBODeffDT: [''],
        JBODcmplDT: [''],
        JBODbaCode: [''],
        JBODLdngUN:[''],
        JBODtrUfstCtnr: [''],
        JBODtrUstklocn1: [''],
        JBODtrUeqpid1: [''],
        JBODtrUsndCtnr: [''],
        JBODtrUstklocn2: [''],
        JBODtrUeqpid2: [''],

        JBODtrLfstCtnr: [''],
        JBODtrLeqpid1: [''],
        JBODtrLsndCtnr: [''],
        JBODtrLeqpid2: [''],
        JBODselRsndly: [''],
        JBODRsndlyCd: [''],
        JBODPurposeStuffing: [''],
        JBODPurposeDstuffing: [''],
        JBODvhclSize: [''],

        JBODpmtDtlspdby: [''],
        JBODallotType: [''],
        JBODamt: [''],
        JBODcrgs: [''],
        JBODsrvcTx: [''],
        JBODtotAmt: [''],

      });

      }

    ngOnInit(): void {
      this.helpService.helpData$.subscribe(data => {
        if (data?.result) {
          this.helpData = data.result;
          this.filteredCmdtList = [...this.helpData];
          console.log('Help Data received:', this.helpData);
        }
      });

      this.helpService.cnsrcustomerData$.subscribe(data => {
        if (data?.result) {
          this.consignerHelpData = data.result;
          this.filteredConsignerList = [...this.consignerHelpData];
          console.log('Consigner Code Help Data:', this.consignerHelpData);
        }
      });

      this.helpService.cnsecustomerData$.subscribe(data => {
        if (data?.result) {
          this.consigneeHelpData = data.result;
          this.filteredConsigneeList = [...this.consigneeHelpData];
          console.log('Consignee Code Help Data:', this.consigneeHelpData);
        }
      });

      this.helpService.custIdData$.subscribe(data => {
        if (data?.result) {
          this.customerIdHelpData = data.result;
          this.filteredCustomerIdList = [...this.customerIdHelpData];
          console.log('Customer ID Help Data:', this.customerIdHelpData);
        }
      });

      this.form.get('JBODLdngUN')?.valueChanges.subscribe((value: string) => {
  if (value === 'L') {
    this.isLoadingSelected = true;
    this.isUnloadingSelected = false;
    // Optionally reset unloading fields
    this.form.patchValue({
      JBODtrUfstCtnr: '',
      JBODtrUstklocn1: '',
      JBODtrUeqpid1: '',
      JBODtrUsndCtnr: '',
      JBODtrUstklocn2: '',
      JBODtrUeqpid2: ''
    });
  } else if (value === 'U') {
    this.isLoadingSelected = false;
    this.isUnloadingSelected = true;
    // Optionally reset loading fields
    this.form.patchValue({
      JBODtrLfstCtnr: '',
      JBODtrLeqpid1: '',
      JBODtrLsndCtnr: '',
      JBODtrLeqpid2: ''
    });
  } else {
    this.isLoadingSelected = false;
    this.isUnloadingSelected = false;
  }
});


this.form.get('JBODtrUsndCtnr')?.valueChanges.subscribe((val: any) => {
    const stackLoc1 = this.form.get('JBODtrUstklocn1')?.value;
    const eqptId1 = this.form.get('JBODtrUeqpid1')?.value;

    if (val) {
      this.form.patchValue({
        JBODtrUstklocn2: stackLoc1,
        JBODtrUeqpid2: eqptId1
      });
    } else {
      this.form.patchValue({
        JBODtrUstklocn2: '',
        JBODtrUeqpid2: ''
      });
    }
  });

  this.form.get('JBODtrLsndCtnr')?.valueChanges.subscribe((val: any) => {
    const eqptId1 = this.form.get('JBODtrLeqpid1')?.value;

    if (val) {
      this.form.patchValue({
        JBODtrLeqpid2: eqptId1
      });
    } else {
      this.form.patchValue({
        JBODtrLeqpid2: ''
      });
    }
  });



   const data = this.gatepasstore.getGatePassData();
  if (data) {
    this.formFieldMappings.forEach(({ apiKey, formControlName }) => {
      const value = (data[apiKey] || '').trim();
      this.form.get(formControlName)?.setValue(value);
    });
  }


   const today = new Date();
  const yyyy = today.getFullYear();
  const mm = (today.getMonth() + 1).toString().padStart(2, '0');
  const dd = today.getDate().toString().padStart(2, '0');
  const todayFormatted = `${yyyy}-${mm}-${dd}`;
  this.form.get('JBODCurrDate')?.setValue(todayFormatted);

  this.currentDateTime = this.formatDateTimeLocal(today);


  const now = new Date();
const formattedNow = this.formatDateTimeLocal(now);
this.form.get('JBODissueDT')?.setValue(formattedNow);
this.form.get('JBODeffDT')?.setValue(formattedNow);
this.form.get('JBODcmplDT')?.setValue(formattedNow);




    }


    formFieldMappings = [
  { apiKey: 'ATCH_DTCHFLAG', formControlName: '' },
  { apiKey: 'CNCL_FLAG', formControlName: '' },
  { apiKey: 'LDNG_UNLDFLAG', formControlName: 'JBODLdngUN' },
  { apiKey: 'PAID_BYCNCRFLAG', formControlName: 'JBODpmtDtlspdby' },
  { apiKey: 'PDA_MR_CAFLAG', formControlName: 'JBODallotType' },

  { apiKey: 'RENEW_FLAG', formControlName: '' },
  { apiKey: 'TRLR_OWNR', formControlName: 'JBODTrlrOwnr' },
  { apiKey: 'CHK_FLAG', formControlName: '' },
  { apiKey: 'ACTY_CODE', formControlName: '' },

  { apiKey: 'CNCL_TIME', formControlName: '' },
  { apiKey: 'CNSG_ID', formControlName: 'JBODcnIdPrno' },
  { apiKey: 'CNTR_STTNFROM', formControlName: '' },
  { apiKey: 'CNTR_STTNTO', formControlName: '' },

  { apiKey: 'DELAY_BY', formControlName: '' },
  { apiKey: 'DELAY_RESNCODE', formControlName: 'JBODRsndlyCd' },
  { apiKey: 'DELY_RESN', formControlName: '' },
  { apiKey: 'EFCT_TIME', formControlName: 'JBODeffDT' },

  { apiKey: 'EQPT_ID', formControlName: 'JBODtrUeqpid1' },
  { apiKey: 'ISSUE_TIME', formControlName: 'JBODissueDT' },
  { apiKey: 'JOB_ORDRNUMB', formControlName: 'JBODjbOdrno' },
  { apiKey: 'LDNG_FRSTCNTR', formControlName: 'JBODtrLfstCtnr' },

  { apiKey: 'LDNG_SCNDCNTR', formControlName: 'JBODtrLsndCtnr' },
  { apiKey: 'STTN', formControlName: 'JBODSttnFrm' },
  { apiKey: 'TRLR_NUMB', formControlName: 'JBODtrlrno' },
  { apiKey: 'UNLD_FRSTCNTR', formControlName: 'JBODtrUfstCtnr' },

  { apiKey: 'UNLD_SCNDCNTR', formControlName: 'JBODtrUsndCtnr' },
  { apiKey: 'USER_ID', formControlName: '' },

  { apiKey: 'VLDT_UPTO', formControlName: '' },
  { apiKey: 'WORK_ORDRNUMB', formControlName: 'JBODwkOdrno' },
  { apiKey: 'CMPL_TIME', formControlName: 'JBODcmplDT' },
  { apiKey: 'OPT_SLCT', formControlName: '' },

  { apiKey: 'CTRCTR_CODE', formControlName: '' },

  { apiKey: 'JV_LOGIN', formControlName: '' },
  { apiKey: 'TRMN_LOGIN', formControlName: '' },
  { apiKey: 'USER_LOGIN', formControlName: '' },

  { apiKey: 'STCK_CURRENT', formControlName: '' },

];


  onSubmit() {
alert("submitted");
  const formValues = this.form.value;

  // Prepare the flat payload - SRVC at root level, no wrapping object
  const finalPayload = {
  SRVC: "CTJOTRLR",
  AMNT: formValues.JBODamt,
  ATCH_DTCHFLAG: "N",
  BD_FLAG: "0",
  CNCL_FLAG: "N",
  CNCL_TIME: "",
  CNSG_ID: formValues.JBODcnIdPrno,                 // or set it dynamically
  CNTR_STTNTO: "",                                  // if any destination station
  CUST_CODE: formValues.JBODbnGtCucode,               // from form
  DELAY_BY: formValues.JBODselRsndly,
  DELAY_RESNCODE: formValues.JBODRsndlyCd,
  DELY_RESN: "",
  EFCT_TIME: "20-05-25 14:00",//formValues.JBODeffDT,                // 'dd-MM-yy HH:mm'
  EQPT_ID: formValues.JBODtrUeqpid1 || formValues.JBODtrLeqpid1,
  ISSUE_TIME: "20-05-25 14:00",//formValues.JBODissueDT,               // same as EFCT_TIME
  LDNG_FRSTCNTR: formValues.JBODtrLfstCtnr || "", // if available
  LDNG_SCNDCNTR: formValues.JBODtrLsndCtnr || "",
  LDNG_UNLDFLAG: formValues.JBODLdngUN,
  PAID_BYCNCRFLAG: formValues.JBODpmtDtlspdby,
  PDA_MR_CAFLAG: formValues.JBODallotType,
  VS_STCKLOCN: formValues.JBODtrUstklocn1 || "",
  RENEW_FLAG: "N",
  STTN: formValues.JBODSttnFrm,
  TRLR_NUMB: formValues.JBODtrlrno,
  TRLR_OWNR: formValues.JBODTrlrOwnr,                                     // Trailer ownership
  UNLD_FRSTCNTR: formValues.JBODtrUfstCtnr,
  UNLD_SCNDCNTR: formValues.JBODtrUsndCtnr,
  USER_ID: "CRIS",
  WORK_ORDRNUMB: formValues.JBODwkOdrno,
  CMPL_TIME: formValues.JBODcmplDT,
  CHK_FLAG: "I",
  OPT_SLCT: "C",
  CTRCTR_CODE: ["MNOQ", "*"],                         // or fetch dynamically
  JV_LOGIN: "*",
  TRMN_LOGIN: formValues.JBODSttnFrm,
  USER_LOGIN: "CRIS",
  STCK_NEW: ["", ""],
    EBOOK_FLAG: 'Y'
};

  console.log('📦 Gate Order:', finalPayload);

  this.gateservice.submitJobOrdrForm(JSON.stringify(finalPayload)).subscribe({
    next: (res) => {
      console.log('✅ Submitted successfully', res);
      alert('Form submitted!');
      this.router.navigate(['/jobOrderRtrv']);
    },
    error: (err) => {
      console.error('❌ Submission failed', err);
      alert('Something went wrong!');
    }
  });
}


formatDateTimeLocal(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

formatToDDMMYY(dateStr: string): string {
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${dd}-${mm}-${yyyy.slice(2)}`;
}




setEndOfDay(): void {
  const now = new Date();
  now.setHours(23, 59, 0, 0); // Set to 23:59

  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  this.endOfDay = `${day}-${month}-${year} ${hours}:${minutes}`;
}




autoFillUnloadingFields() {
  const form = this.form;

  const sndContainerVal = form.get('JBODtrUsndCtnr')?.value;
  if (sndContainerVal) {
    const stackLoc1 = form.get('JBODtrUstklocn1')?.value;
    const eqptId1 = form.get('JBODtrUeqpid1')?.value;

    form.patchValue({
      JBODtrUstklocn2: stackLoc1,
      JBODtrUeqpid2: eqptId1
    });
  }
}

autoFillLoadingFields() {
  const form = this.form;

  const sndContainerVal = form.get('JBODtrLsndCtnr')?.value;
  if (sndContainerVal) {
    const eqptId1 = form.get('JBODtrLeqpid1')?.value;

    form.patchValue({
      JBODtrLeqpid2: eqptId1
    });
  }
}


}

