
import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/** Mock validation (unchanged) */
class MockFormValidationService {
  getValidationClass(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    if (!control) return '';
    return control.invalid && (control.dirty || control.touched) ? 'is-invalid' : '';
  }
}

/** Consignee block model */
interface ConsigneeRetrieveDetails {
  cnsgDate: string;
  sttnFrom: string;
  sttnTo: string;
  cmdtCode: string;
  srvcMode: string;
  cnsr: string;
  cnse: string;
}

/** Detailed container row used for CONCOR/CUSTOMER tables */
interface DetailedContainer {
  number: number;
  type: string;
  sfCode: string;
  stackLocn: string;
  ds0Iso: string;
  shippingLineCode: string;
  allotmentDateTime: string;
  noOfSeals: number;
  tatkalYN: string;
  tatkalCharges: number;
  srcTnptBy: string;
  containerOwner: 'CONCOR' | 'CUSTOMER';
  fareWght: number;
  grossWght: number;
}

/** Top grid row (4 columns only) */
interface ContainerSummaryItem {
  cntrType: string;
  cntrReq: string;      // could be Y/N or a number as per data
  cntrAlloted: string; // Y/N or a number
  ownedBy: 'CONCOR' | 'CUSTOMER';
}

@Component({
  selector: 'app-container-allocation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: 'container-allocation.component.html',
  styleUrls: ['container-allocation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerAllocationComponent implements OnInit {
  form: FormGroup;

  // Consignee Details signal
  consigneeDetails = signal<ConsigneeRetrieveDetails>({
    cnsgDate: '', sttnFrom: '', sttnTo: '', cmdtCode: '',
    srvcMode: '', cnsr: '', cnse: '',
  });

  /** TOP GRID (4 columns) */
  containerGridData = signal<ContainerSummaryItem[]>([]);

  /** DETAILED tables (full columns) */
  concorOwnedData = signal<DetailedContainer[]>([]);
  customerOwnedData = signal<DetailedContainer[]>([]);

  /** Overlay toggles */
  showModifyForm = signal<boolean>(false);
  showAllotmentForm = signal<boolean>(false);

  private formValidator = new MockFormValidationService();

  constructor(private fb: FormBuilder) {
    const cnsgIdPattern = /^[A-Z]{4}\d{4}$/;
    this.form = this.fb.group({
      cnsgId: ['', [Validators.required, Validators.pattern(cnsgIdPattern)]],
    });

    // Clear all when ID cleared
    this.form.get('cnsgId')?.valueChanges.subscribe(val => {
      if (!val) this.clearAllData();
    });
  }

  ngOnInit(): void { /* initial blank */ }

  getValidationClass(controlName: string): string {
    return this.formValidator.getValidationClass(this.form, controlName);
  }

  clearAllData(): void {
    this.consigneeDetails.set({
      cnsgDate: '', sttnFrom: '', sttnTo: '', cmdtCode: '',
      srvcMode: '', cnsr: '', cnse: ''
    });
    this.containerGridData.set([]);
    this.concorOwnedData.set([]);
    this.customerOwnedData.set([]);
  }
  

  /** Populate all data from dummy source (not connected to backend) */
  retrieveData(): void {
    this.form.get('cnsgId')?.markAsTouched();
    if (this.form.get('cnsgId')?.invalid) {
      this.clearAllData();
      return;
    }

    // Fill Consignee details
    this.consigneeDetails.set({
      cnsgDate: '2025-09-01',
      sttnFrom: 'DELH',
      sttnTo: 'MUMB',
      cmdtCode: 'CMDT01',
      srvcMode: 'ROAD',
      cnsr: 'CONSIGNOR-XYZ',
      cnse: 'CONSIGNEE-ABC',
    });

    // ----- DUMMY DATA GENERATION (up to ~90 containers possible) -----
    const detailed: DetailedContainer[] = [];
    const types = ['DRY', 'REF', 'TANK', 'FLAT'];
    const owners: Array<'CONCOR' | 'CUSTOMER'> = ['CONCOR', 'CUSTOMER'];
    const srcBy = ['ROAD', 'RAIL'];

    for (let i = 1; i <= 40; i++) { // you can increase to 90 if needed
      const owner = owners[i % 2];
      const t = types[i % types.length];
      const allotted = i % 3 !== 0; // 2/3 allotted
      detailed.push({
        number: i,
        type: t,
        sfCode: 'SF' + String(i).padStart(2, '0'),
        stackLocn: String.fromCharCode(65 + (i % 6)) + (100 + i),
        ds0Iso: i % 2 === 0 ? 'DS0' : 'ISO',
        shippingLineCode: i % 2 === 0 ? 'MAERSK' : 'MSC',
        allotmentDateTime: allotted ? `2025-09-01 ${10 + (i % 8)}:${i % 2 ? '30' : '00'}` : '',
        noOfSeals: (i % 2) + 1,
        tatkalYN: i % 5 === 0 ? 'Y' : 'N',
        tatkalCharges: i % 5 === 0 ? 500 : 0,
        srcTnptBy: srcBy[i % srcBy.length],
        containerOwner: owner,
        fareWght: 10000 + i * 100,
        grossWght: 20000 + i * 120,
      });
    }

    // Split into CONCOR vs CUSTOMER (Requirement #6)
    const concor = detailed.filter(d => d.containerOwner === 'CONCOR');
    const customer = detailed.filter(d => d.containerOwner === 'CUSTOMER');
    this.concorOwnedData.set(concor);
    this.customerOwnedData.set(customer);

    // Build TOP GRID rows (4 columns) from detailed rows
    const topGrid: ContainerSummaryItem[] = detailed.map(d => ({
      cntrType: d.type,
      cntrReq: 'Y', // demo: assume each was requested; if you want counts, replace with a number
      cntrAlloted: d.allotmentDateTime ? 'Y' : 'N',
      ownedBy: d.containerOwner,
    }));
    this.containerGridData.set(topGrid);
  }

  openModifyForm(): void { this.showModifyForm.set(true); }
  openAllotmentForm(): void { this.showAllotmentForm.set(true); }
  closeBlankPage(): void {
    this.showModifyForm.set(false);
    this.showAllotmentForm.set(false);
  }
}
