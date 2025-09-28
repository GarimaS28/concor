import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { Router } from '@angular/router';
import { GateserviceService } from 'src/app/services/gateservice.service';
import { GatepassstoreserviceService } from 'src/app/services/gatepassstoreservice.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-book-delivery',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './book-delivery.component.html',
  styleUrls: ['./book-delivery.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BookDeliveryComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('surchargeScrollContainer') surchargeScrollContainer!: ElementRef;

  form: FormGroup;
  isLoading: boolean = false;
  isBreakupModalOpen = false;

 breakupData: {
    containerNumbers: string[];
    charges: {
      name: string;
      data: Record<string, { amount: number; gst: number }>;
    }[];
    totals: Record<string, { amount: number; gst: number }>;
  } = {
    containerNumbers: ['CONT001', 'CONT002'],
    charges: [
      {
        name: 'Some Charge',
        data: {
          CONT001: { amount: 100, gst: 18 },
          CONT002: { amount: 200, gst: 36 },
        },
      },
    ],
    totals: {
      CONT001: { amount: 6000, gst: 1080 },
      CONT002: { amount: 5700, gst: 1026 },
    },
  };

  constructor(
    private helpService: HelpService,
    private fb: FormBuilder,
    private router: Router,
    private gateservice: GateserviceService,
    private gatepasstore: GatepassstoreserviceService
  ) {
    this.form = this.fb.group({
      FwdNtSttn: ['', Validators.required],
      FwdNtDate: [''],
      BDNumber: [''],
      BDDate: [''],
      
      // Nested FormGroups based on HTML structure
      iwbDetails: this.fb.group({
        FwdNtIWBNumber: [''],
        FwdNtConsignmentId: [''],
        FwdNtContainerNumber: [''],
        FwdNtIWDate: [''],
        FwdNtInvoiceNo: [''],
        FwdNtStationFrom: ['']
      }),
      
      distanceDetails: this.fb.group({
        FwdNtDistanceConsignor: [''],
        FwdNtPickupPoint: [''],
        FwdNtConsignee: [''],
        FwdNtDlvrPoint: [''],
        FwdNtDeliveryState: [''],
        FwdNtDeliveryAddress: ['']
      }),

      details: this.fb.group({
        FwdNtCnsrCode: [''],
        FwdNtCnsrName: [''],
        FwdNtCmdtType: [''],
        FwdNtPmnttype: [''],
        FwdNtSrvcMode: [''],
        FwdNtstfngCtnrs: [''],
        FwdNtCnsID: [''],
        FwdNtAddr: [''],
        FwdNtCity: [''],
        FwdNtPhone: [''],
        FwdNtEmail: [''],
        FwdNtCRISGSTN: ['']
      }),
      
      // FormArrays
      containerDetails: this.fb.array([this.createContainerDetailFormGroup()]),
      surchargeDetailsArray: this.fb.array([]), // Initialize as empty as it's for the modal
      
      // Total fields
      TotalCharge: [''],
      TotalGST: [''],
      TotalTDS: [''],
      AmtPayable: [''],
      
      // Final section fields
      FwdNtCorpCode: [''],
      FwdNtCorpName: [''],
      FwdNtAmountPybl: ['']
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const todayFormatted = this.formatDate(today);
    this.form.patchValue({
      FwdNtDate: todayFormatted,
      iwbDetails: { FwdNtIWDate: todayFormatted }
    });
    // This is for demonstration, as per your code:
    this.form.get('FwdNtCorpName')?.setValue('Dummy Grand Total');
    this.form.get('Payable')?.setValue('Dummy Payable');
  }

  // Helper function to format date
  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Getters for easy access to FormArrays
  get containerDetails(): FormArray {
    return this.form.get('containerDetails') as FormArray;
  }
  
  get surchargeDetailsArray(): FormArray {
    return this.form.get('surchargeDetailsArray') as FormArray;
  }

  // FormGroup factory methods
  createContainerDetailFormGroup(): FormGroup {
    return this.fb.group({
      ContainerNo: [''],
      ContainerType: [''],
      ContainerSize: [''],
      LE: [''],
      CommodityStuffed: [''],
      CommodityType: [''],
      NoOfPackages: [''],
      Weight: [''],
      SealNumbers: [''],
      ArrivalStatus: [''],
      TransportedBy: [''],
      isSelected: [false]
    });
  }

  createSurchargeDetailsGroup(): FormGroup {
    return this.fb.group({
      containerNumber: [''],
      rate: [''],
      overWt: [''],
      hazard: [''],
      toLatePay: [''],
      tnptSur: [''],
      cargo: [''],
      handling: [''],
      tnpt: [''],
      tscCwc: [''],
      detention: [''],
      ptiChrg: [''],
      plugInChrg: [''],
      tac: [''],
      charges: [''],
      fromNonTaxable: [''],
      fromTaxable: [''],
      toNonTaxable: [''],
      toTaxable: [''],
      brdrFrom: [''],
      brdrTo: [''],
      waiverAmount: [''],
      credit: [''],
      totalServiceTax: [''],
      swachhBharatCess: [''],
      krishiKalyanCess: [''],
      netAmount: [''],
    });
  }

  // Form manipulation methods
  onSubmit(): void {
    if (this.form.valid) {
      console.log('✅ Form Submitted with Payload:', this.form.value);
      this.gateservice.submitGatePassForm(this.form.value).subscribe({
        next: (res) => {
          console.log('✅ Submitted successfully', res);
          alert('Form submitted!');
          this.router.navigate(['/commonsucces']);
        },
        error: (err) => {
          console.log('❌ Submission failed', err);
          alert('Something went wrong!');
          this.router.navigate(['/comoinfailure']);
        }
      });
    } else {
      console.log('❌ Form is invalid');
      alert('Please fill out all required fields.');
    }
  }

  addContainerRow(): void {
    this.containerDetails.push(this.createContainerDetailFormGroup());
    setTimeout(() => this.scrollToBottom(), 0);
  }

  removeContainerRow(index: number): void {
    this.containerDetails.removeAt(index);
  }

  toggleRowBorder(index: number): void {
    const isSelectedControl = this.containerDetails.at(index).get('isSelected');
    if (!isSelectedControl) return;

    const selectedCount = this.containerDetails.controls.filter(
      (control) => control.get('isSelected')?.value
    ).length;

    if (isSelectedControl.value && selectedCount > 6) {
      alert('You can select a maximum of 6 containers at a time.');
      isSelectedControl.setValue(false, { emitEvent: false });
      return;
    }

    const rowElement = document.getElementById(`row-${index}`);
    if (rowElement) {
      if (isSelectedControl.value) {
        rowElement.classList.add('selected-row');
      } else {
        rowElement.classList.remove('selected-row');
      }
    }
  }

  fetchAndFillCharges(): void {
    const dummyChargesData = [{
      containerNumber: 'CNTR123',
      rate: '100',
      overWt: '10',
      hazard: '0',
      toLatePay: '5',
      tnptSur: '20',
      cargo: '30',
      handling: '15',
      tnpt: '25',
      tscCwc: '5',
      detention: '10',
      ptiChrg: '5',
      plugInChrg: '5',
      tac: '5',
      charges: '5',
      fromNonTaxable: '0',
      fromTaxable: '0',
      toNonTaxable: '0',
      toTaxable: '0',
      brdrFrom: '0',
      brdrTo: '0',
      waiverAmount: '0',
      credit: '0',
      totalServiceTax: '10',
      swachhBharatCess: '1',
      krishiKalyanCess: '1',
      netAmount: '200'
    }];
    
    // Clear existing form array controls
    while (this.surchargeDetailsArray.length !== 0) {
      this.surchargeDetailsArray.removeAt(0);
    }
    
    // Add new controls from dummy data
    dummyChargesData.forEach(charge => {
      this.surchargeDetailsArray.push(this.fb.group(charge));
    });

    this.scrollToBottomSurcharge();
  }

  getBreakupDetails(): void {
    const dummyBreakupData = [
      {
        container: 'CNTR123',
        charges: [
          { name: 'Over Wt.', amount: 10, gst: 1.8 },
          { name: 'Hazard', amount: 0, gst: 0 },
          { name: 'Tnpt Sur', amount: 20, gst: 3.6 },
          { name: 'Handling', amount: 15, gst: 2.7 },
        ]
      },
      {
        container: 'CNTR456',
        charges: [
          { name: 'Over Wt.', amount: 5, gst: 0.9 },
          { name: 'Hazard', amount: 10, gst: 1.8 },
          { name: 'Tnpt Sur', amount: 25, gst: 4.5 },
          { name: 'Handling', amount: 20, gst: 3.6 },
        ]
      }
    ];

    const chargeMap: { [key: string]: { name: string; data: { [key: string]: { amount: number; gst: number } } } } = {};
    const containerNumbers = new Set<string>();

    dummyBreakupData.forEach(containerData => {
      containerNumbers.add(containerData.container);
      containerData.charges.forEach(charge => {
        if (!chargeMap[charge.name]) {
          chargeMap[charge.name] = { name: charge.name, data: {} };
        }
        chargeMap[charge.name].data[containerData.container] = {
          amount: charge.amount,
          gst: charge.gst
        };
      });
    });

    this.breakupData.containerNumbers = Array.from(containerNumbers);
    this.breakupData.charges = Object.values(chargeMap);
  }

  openBreakupModal(): void {
    this.getBreakupDetails();
    this.isBreakupModalOpen = true;
  }

  closeBreakupModal(): void {
    this.isBreakupModalOpen = false;
  }

  // Scroll methods
  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  private scrollToBottomSurcharge(): void {
    try {
      this.surchargeScrollContainer.nativeElement.scrollTop = this.surchargeScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

 


}