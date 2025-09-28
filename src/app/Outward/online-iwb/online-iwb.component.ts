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
  selector: 'app-online-iwb',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './online-iwb.component.html',
  styleUrls: ['./online-iwb.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class OnlineIWBComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

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
      FwdNtConsignmentId: [''],
      FwdNtContainerNumber: [''],
      consigneeGstnApplicable: [false],
      FwdNtStationTo: [''],
      RefBa: [false],
      FwdNtPmntType: [''],
      FwdNtSrvcMode: [''],
      RakeType: [''],
      StnNo: [''],
      IWBNo: [''],
      IWBDate: [''],
      TransportMode: [''],
      SpclRate: [false],
      ISO: [false],
      CustRate: [false],
      Distance: [''],
      PickupPoint: [''],
      State: [''],
      Address: [''],
      CnseDist: [''],
      DlvrPoint: [''],
      State2: [''],
      Address2: [''],
      details: this.fb.group({
        FwdNtCnsrCode: [''],
        FwdNtCnsrName: [''],
        FwdNtstfngCtnrs: [''],
        FwdNtCnsID: [''],
        FwdNtCRISGSTN: [''],
        CnseCode: [''],
        CnseName: [''],
        CnseState: [''],
        CnseId: [''],
        StationFrom: [''],
        ViaSttn: [''],
      }),
      containerDetails: this.fb.array([this.createContainerDetailFormGroup()]),
      TotalWaiver: [''],
      TotalCess: [''],
      GrandTotal: [''],
      Payable: [''],
      GroupId: [''],
      SaidToContain: [false],
      ContRate: [false]
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const todayFormatted = this.formatDate(today);
    this.form.patchValue({
      FwdNtDate: todayFormatted,
      IWBDate: todayFormatted
    });
  }

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  get containerDetails(): FormArray {
    return this.form.get('containerDetails') as FormArray;
  }

  createContainerDetailFormGroup(): FormGroup {
    return this.fb.group({
      ContainerNo: [''],
      ContainerType: [''],
      ContainerSize: [''],
      LE: [''],
      CommodityCode: [''],
      NoOfArticles: [''],
      Weight: [''],
      SealNumbers: [''],
      StationTo: [''],
      PaymentType: [''],
      ServiceMode: [''],
      TransportedBy: [''],
      CnsrId: [''],
      CnsrState: [''],
      CnsrGstn: [''],
      CnseCode: [''],
      CnseName: [''],
      CnseId: [''],
      CnseState: [''],
      CnseGstn: [''],
      CorpCustCode: [''],
      isSelected: [false]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('✅ Form Submitted with Payload:', this.form.value);
      this.gateservice.submitGatePassForm(this.form.value).subscribe({
        next: (res) => {
          console.log('✅ Submitted successfully', res);
          alert('Form submitted!');
          this.router.navigate(['/fNoteRtrv']);
        },
        error: (err) => {
          console.log('❌ Submission failed', err);
          alert('Something went wrong!');
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

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
}

