

import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormArray, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { Router } from '@angular/router';
import { GateserviceService } from 'src/app/services/gateservice.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { DateServiceService } from 'src/app/shared/Date/date-service.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LoaderComponent } from 'src/app/theme/shared/components/loader/loader.component';
import { trigger, style, transition, animate } from '@angular/animations';

interface AllotmentInfo {
  Number: string;
  Type: string;
  Size: string;
  STCode: string;
  Stack: string;
  BBO_ISO: string;
  ShippingLineCode: string;
  AllotmentDateTime: string;
}

interface ContainerInfo {
  ALOTctnrNo: string;
  ALOTctnrSize: string;
  ALOTctnrType: string;
  ALOTctnrOwnd?: string;
}

@Component({
  selector: 'app-empty-loading', // Note: The selector has been changed to match the new component name.
  standalone: true,
  imports: [SharedModule, FormsModule, LoaderComponent], // These are the original imports from ContainerAllocationComponent.
  templateUrl: './empty-loading.component.html', // Note: The template URL is now correct for this file.
  styleUrl: './empty-loading.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class EmptyLoadingComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  invalidFields: string[] = [];
  filledStatus: { [key: string]: boolean } = {};

  // Help data
  TrmnlData: any[] = [];
  TrmnlDataTO: any[] = [];
  containerHelpData: any[] = [];
  consignerHelpData: any[] = [];
  consigneeHelpData: any[] = [];

  // Filtered lists for dropdowns
  filteredStationList: any[] = [];
  filteredContainerTypes: any[] = [];
  filteredConsignerList: any[] = [];
  filteredConsigneeList: any[] = [];
  
  todayFormatted: string = '';

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  showStationDropdown: boolean = false;
  showStationToDropdown: boolean = false;
  showContainerHelp: boolean[] = [];
  helpDropdownIndex: number | null = null;
  helpDropdownTop: number = 0;
  helpDropdownLeft: number = 0;
  showConsignerDropdown = false;
  showConsigneeDropdown = false;
  isRadioEnabled: boolean = false;
  showSubtaskMenu = false;
  highlightedIndices: { [fieldName: string]: number } = {};
  enterPressedForField: { [fieldName: string]: boolean } = {};
  isContainerModalOpen: boolean = false;
  isOwnedChecked: boolean = false; 

  // FormArray properties for different tables
  allotmentTable: FormArray;
  containerArray: FormArray;

  constructor(
    private helpService: HelpService,
    private fb: FormBuilder,
    private router: Router,
    private gateservice: GateserviceService,
    public formValidator: FormValidationService,
    public Datevalidation: DateServiceService
  ) {
    this.form = this.fb.group({
      ALOTsttnfrm: ['', Validators.required],
      ALOTsttnto: ['', Validators.required],
      ALOTcurrDt: ['', Validators.required],
      ALOTsrvcMd: ['', Validators.required],
      
      ALOTcnsrCode: ['', Validators.required],
      ALOTcnsrName: ['', Validators.required],
      ALOTcnsrAdrs: ['', Validators.required],
      ALOTcnsrcity: ['', Validators.required],
      ALOTcnsrstat: ['', Validators.required],
      ALOTcnsrPhon: ['', Validators.required],
      
      ALOTcnseCode: ['', Validators.required],
      ALOTcnseName: ['', Validators.required],
      ALOTcnseAdrs: ['', Validators.required],
      ALOTcnsecity: ['', Validators.required],
      ALOTcnsestat: ['', Validators.required],
      ALOTcnsePhon: ['', Validators.required],
      
      AllotmentTable: this.fb.array([this.createAllotmentGroup()]),

      ALOTcontainerArray: this.fb.array([this.createContainerGroup()], { validators: [this.validateUniqueContainerOwnership] }),
      ALOTPaidby: ['', Validators.required],
      ALOTtype: ['', Validators.required],
      ALOTamount: ['', Validators.required],
    }, { validators: this.stationFromToValidator() });
    
    this.allotmentTable = this.form.get('AllotmentTable') as FormArray;
    this.containerArray = this.form.get('ALOTcontainerArray') as FormArray;

  }

  createContainerGroup(): FormGroup {
    return this.fb.group({
      ALOTctnrType: ['', Validators.required],
      ALOTctnrSize: ['', Validators.required],
      ALOTctnrNo: ['', Validators.required],
      ALOTctnrOwnd: ['']
    });
  }
  
  createAllotmentGroup(): FormGroup {
    return this.fb.group({
      Number: ['', Validators.required],
      Type: ['', Validators.required],
      Size: ['', Validators.required],
      STCode: ['', Validators.required],
      Stack: ['', Validators.required],
      BBO_ISO: ['', Validators.required],
      ShippingLineCode: ['', Validators.required],
      AllotmentDateTime: ['', Validators.required],
    });
  }

  get allotmentArray(): FormArray {
    return this.form.get('AllotmentTable') as FormArray;
  }
  
  ngOnInit(): void {
    this.form.get('ALOTPaidby')?.valueChanges.subscribe(() => {
      this.form.get('ALOTtype')?.reset();
      this.form.get('ALOTamount')?.setValue('');
      this.isRadioEnabled = false;
    });

    this.helpService.TrmnlCode$.subscribe(data => {
      if (data?.result) {
        this.TrmnlData = data.result;
        this.filteredStationList = [...this.TrmnlData];
      }
    });

    this.helpService.TrmnlCodeTo$.subscribe(data => {
      if (data?.result) {
        this.TrmnlDataTO = data.result;
      }
    });

    this.helpService.CtnrType$.subscribe(data => {
      if (data?.result) {
        this.containerHelpData = data.result;
        this.filteredContainerTypes = [...data.result];
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

    const today = new Date();
    this.todayFormatted = this.formatDate(today);
    this.form.get('ALOTcurrDt')?.setValue(this.todayFormatted);
  }
  
  // --- Utility Methods ---
  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  formatToDDMMYY(dateStr?: string): string {
    if (!dateStr || typeof dateStr !== 'string') {
      return '';
    }
    const parts = dateStr.split('-');
    if (parts.length !== 3) {
      return dateStr;
    }
    const [yyyy, mm, dd] = parts;
    return `${dd}-${mm}-${yyyy.slice(2)}`;
  }
  
  // --- Help Dropdown Logic ---
  onStationFromInputChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filterStationList(input);
    this.showStationDropdown = true;
  }

  validateStationFromInput(): void {
    // This method is called on blur and can be used for validation.
    // The validation logic is already in the form group, so this is
    // mostly for triggering form validation on blur.
  }

  onInputBlur(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }

  filterStationList(search: string) {
    if (!search) {
      this.filteredStationList = [...this.TrmnlData];
      return;
    }
    this.filteredStationList = this.TrmnlData.filter(station =>
      station.p_TrmnCode?.toLowerCase().includes(search.toLowerCase())
    );
  }

  selectStationCode(station: any) {
    this.form.get('ALOTsttnfrm')?.setValue(station.p_TrmnCode);
    this.showStationDropdown = false;
    this.highlightedIndices['ALOTsttnfrm'] = -1;

    this.form.get('ALOTcnsrCode')?.reset();
    this.form.get('ALOTcnsrName')?.reset();
    this.form.get('ALOTcnsrAdrs')?.reset();
    this.form.get('ALOTcnsrcity')?.reset();
    this.form.get('ALOTcnsrstat')?.reset();
    this.form.get('ALOTcnsrPhon')?.reset();

    const stationCode = this.form.get('ALOTsttnfrm')?.value;
    if (stationCode) {
      this.helpService.getCustomerIdHelpData(stationCode, stationCode).subscribe();
    }
  }

  hideStationDropdownWithDelay() {
    setTimeout(() => {
      this.showStationDropdown = false;
    }, 200);
  }

  onStationToInputChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filterStationToList(input);
    this.showStationToDropdown = true;
  }

  validateStationToInput(): void {
    // Same as validateStationFromInput, for consistency
  }

  filterStationToList(search: string) {
    if (!search) {
      // The HTML does not use a filtered list for the 'to' station, so this is not needed.
      // Keeping it here for completeness if the HTML were to change.
      return;
    }
  }

  hideStationToDropdownWithDelay() {
    setTimeout(() => {
      this.showStationToDropdown = false;
    }, 200);
  }

  // --- Container Help ---

  filterContainerType(index: number) {
    const inputValue = this.containerArray.at(index).get('ALOTctnrType')?.value || '';
    this.filteredContainerTypes = this.containerHelpData.filter(item =>
      item.p_CntrType.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  selectContainerType(item: any, index: number) {
    const group = this.containerArray.at(index);
    group.get('ALOTctnrType')?.setValue(item.p_CntrType);
    group.get('ALOTctnrSize')?.setValue(item.p_CntrSize);
    this.helpDropdownIndex = null;
    this.containerArray.at(index).markAllAsTouched();
    this.evaluateRadioAvailability();
  }

  showHelp(index: number, inputElement: HTMLElement) {
    this.helpDropdownIndex = index;
    const rect = inputElement.getBoundingClientRect();
    this.helpDropdownTop = rect.bottom + window.scrollY;
    this.helpDropdownLeft = rect.left + window.scrollX;
    this.filterContainerType(index);
  }

  hideHelp() {
    this.helpDropdownIndex = null;
  }

  // --- Consigner and Consignee Help ---

  filterConsignerList(value: string) {
    this.filteredConsignerList = this.consignerHelpData.filter(item =>
      item.p_CustCode.toLowerCase().includes(value.toLowerCase()) ||
      item.p_CustName.toLowerCase().includes(value.toLowerCase())
    );
  }

  selectConsigner(item: any) {
    this.form.get('ALOTcnsrCode')?.setValue(item.p_CustCode);
    this.form.get('ALOTcnsrName')?.setValue(item.p_CustName);
    this.form.get('ALOTcnsrAdrs')?.setValue(item.p_CustAddr);
    this.form.get('ALOTcnsrcity')?.setValue(item.p_CustCity);
    this.form.get('ALOTcnsrstat')?.setValue(item.p_StateCode);
    this.form.get('ALOTcnsrPhon')?.setValue(item.p_CustPhone);
    this.showConsignerDropdown = false;
  }

  hideConsignerDropdownWithDelay() {
    setTimeout(() => {
      this.showConsignerDropdown = false;
    }, 200);
  }

  filterConsigneeList(value: string) {
    this.filteredConsigneeList = this.consigneeHelpData.filter(item =>
      item.p_CustCode.toLowerCase().includes(value.toLowerCase()) ||
      item.p_CustName.toLowerCase().includes(value.toLowerCase())
    );
  }

  selectConsignee(item: any) {
    this.form.get('ALOTcnseCode')?.setValue(item.p_CustCode);
    this.form.get('ALOTcnseName')?.setValue(item.p_CustName);
    this.form.get('ALOTcnseAdrs')?.setValue(item.p_CustAddr);
    this.form.get('ALOTcnsecity')?.setValue(item.p_CustCity);
    this.form.get('ALOTcnsestat')?.setValue(item.p_StateCode);
    this.form.get('ALOTcnsePhon')?.setValue(item.p_CustPhone);
    this.showConsigneeDropdown = false;
  }

  hideConsigneeDropdownWithDelay() {
    setTimeout(() => {
      this.showConsigneeDropdown = false;
    }, 200);
  }

  // --- Form Logic ---

  addRow() {
    const lastIndex = this.containerArray.length - 1;
    if (!this.containerArray.at(lastIndex).valid) {
      this.containerArray.at(lastIndex).markAllAsTouched();
      return;
    }
    const group = this.createContainerGroup();
    this.containerArray.push(group);
    this.clearAmountAndRadio();
    setTimeout(() => {
      this.scrollToBottom();
      const inputs = document.querySelectorAll('input[formControlName="ALOTctnrType"]');
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
      lastInput?.focus();
    }, 100);
  }

  removeRow(index: number): void {
    if (this.containerArray.length > 1) {
      this.containerArray.removeAt(index);
    }
    this.clearAmountAndRadio();
  }

  // Methods for the Allotment table
  addRowA() {
    this.allotmentArray.push(this.createAllotmentGroup());
  }
  
  removeRowA(index: number) {
    if (this.allotmentArray.length > 1) {
      this.allotmentArray.removeAt(index);
    }
  }

  private scrollToBottom() {
    try {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  onSubmit() {
    this.formValidator.markAllFieldsTouched(this.form);
    this.invalidFields = this.formValidator.getInvalidFields(this.form);

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const formValues = this.form.value;

    const containerArray = formValues.ALOTcontainerArray || [];
    const containerSizes = containerArray.map((c: { ALOTctnrSize: any }) => String(c.ALOTctnrSize));
    const containerTypes = containerArray.map((c: { ALOTctnrType: any }) => String(c.ALOTctnrType));
    const numberOfContainers = containerArray.map((c: { ALOTctnrNo: any }) => String(c.ALOTctnrNo));

    const finalPayload = {
      SRVC: "CTREGNSAVE",
      BACK_TRMLFLAG: "N",
      CNSE_ADDR: formValues.ALOTcnseAdrs,
      CNSE_CITY: formValues.ALOTcnsecity,
      CNSE_CODE: formValues.ALOTcnseCode,
      CNSE_NAME: formValues.ALOTcnseName,
      CNSE_PHONE: formValues.ALOTcnsePhon,
      CNSG_DATE: this.formatToDDMMYY(formValues.ALOTcurrDt || ''),
      CNSR_ADDR: formValues.ALOTcnsrAdrs,
      CNSR_CITY: formValues.ALOTcnsrcity,
      CNSR_CODE: formValues.ALOTcnsrCode,
      CNSR_NAME: formValues.ALOTcnsrName,
      CNTR_SIZE: containerSizes,
      CNTR_TYPE: containerTypes,
      NUMB_OFCNTR: numberOfContainers,
      PDA_MR_CAFLAG: formValues.ALOTtype,
      PYMT_TYPE: formValues.ALOTpymntTyp,
      SRVC_MODE: formValues.ALOTsrvcMd,
      STTN_FROM: formValues.ALOTsttnfrm,
      STTN_TO: formValues.ALOTsttnto,
      USER_ID: "CRIS",
      WAIVE_FLAG: "Y",
      ACTIVE_FLAG: "N", // Hardcoded
      REGN_AMNT: formValues.ALOTamount,
    };

    console.log('📦 Allotment Order:', finalPayload);

    this.gateservice.submitallotmentForm(finalPayload).subscribe({
      next: (res: any) => {
        console.log('✅ Submitted successfully', res);
        const data = res.body;
        this.isLoading = false;
        if (data?.ERR_CODE) {
          console.error(`❌ Error: Code = ${data.ERR_CODE}, Message = ${data.ERR_MSG || 'No message'}`);
          this.router.navigate(['/failedstat'], { state: { errCode: data.ERR_CODE, errMsg: data.ERR_MSG || '' } });
        } else if (data?.CNSG_ID) {
          console.log(`✅ CNSG_ID found: ${data.CNSG_ID}`);
          this.router.navigate(['/successstat'], { state: { requestId: data.CNSG_ID } });
        } else {
          console.warn('No CNSG_ID found, redirecting to failedstat');
          this.router.navigate(['/failedstat']);
        }
      },
      error: (err) => {
        console.error('❌ Submission failed', err);
        this.isLoading = false;
        this.router.navigate(['/failedstat']);
      }
    });
  }

  onInputChange(controlName: string) {
    const control = this.form.get(controlName);
    const isEmptyOrInvalid = !control?.value || control.invalid;
    if (isEmptyOrInvalid) {
      if (!this.invalidFields.includes(controlName)) {
        this.invalidFields.push(controlName);
      }
      this.filledStatus[controlName] = false;
    } else {
      this.filledStatus[controlName] = true;
      this.invalidFields = this.invalidFields.filter(f => f !== controlName);
    }
  }

  calculateContainerCharges(paidBy: string) {
    const containerList = this.containerArray.controls.map((group: any) => ({
      p_CntrType: group.get('ALOTctnrType')?.value,
      p_OwnedBy: group.get('ALOTctnrOwnd')?.value || 'CONC',
      p_NoOfCntr: group.get('ALOTctnrNo')?.value,
      p_CntrSize: group.get('ALOTctnrSize')?.value
    }));

    const payload = {
      p_Sttn: this.form.get('ALOTsttnfrm')?.value,
      p_RateType: 'N', // Hardcoded from HTML
      p_CmdtCode: '*', // Not available in the form
      p_CmdtCodeType: '*', // Not available in the form
      p_ActyCode: 'REGN',
      p_JvCode: '*',
      p_CustCode: this.form.get('ALOTcnsrCode')?.value,
      p_SttnTo: this.form.get('ALOTsttnto')?.value,
      p_CpdaFlag: 'Y',
      p_CntrList: containerList
    };

    this.gateservice.getContainerCharges(payload).subscribe({
      next: (res) => {
        if (res?.Result && Array.isArray(res.Result)) {
          const totalAmount = res.Result.reduce((sum: number, item: any) => sum + Number(item.p_TotalChrg || 0), 0);
          this.form.get('ALOTamount')?.setValue(String(totalAmount));
        } else {
          this.form.get('ALOTamount')?.setValue("0");
        }
      },
      error: (err) => {
        console.error('Charge calculation error:', err);
        this.form.get('ALOTamount')?.setValue("0");
      }
    });
  }

  clearAmountAndRadio() {
    this.form.get('ALOTamount')?.setValue('');
    this.form.get('ALOTPaidby')?.setValue('');
    this.form.get('ALOTtype')?.setValue('');
  }

  evaluateRadioAvailability() {
    let allRowsComplete = true;
    this.containerArray.controls.forEach((row, index) => {
      const type = row.get('ALOTctnrType')?.value;
      const size = row.get('ALOTctnrSize')?.value;
      const no = row.get('ALOTctnrNo')?.value;
      if (type || size || no) {
        if (!(type && size && no)) {
          allRowsComplete = false;
        }
      }
    });
    this.isRadioEnabled = allRowsComplete;
  }

  checkContainerRowCompletion(index: number) {
    const row = this.containerArray.at(index);
    const type = row.get('ALOTctnrType')?.value;
    const size = row.get('ALOTctnrSize')?.value;
    const no = row.get('ALOTctnrNo')?.value;
    if ((type || size) && !no) {
      return;
    }
    this.evaluateRadioAvailability();
  }
  
  stationFromToValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const from = group.get('ALOTsttnfrm')?.value?.trim()?.toUpperCase();
      const to = group.get('ALOTsttnto')?.value?.trim()?.toUpperCase();
      if (from && to && from === to) {
        return { sameStation: true };
      }
      return null;
    };
  }

  validateUniqueContainerOwnership(formArray: AbstractControl): ValidationErrors | null {
    const seen = new Set();
    const controls = (formArray as FormArray).controls;
    for (let control of controls) {
      const type = control.get('ALOTctnrType')?.value?.trim()?.toUpperCase();
      const ownership = control.get('ALOTctnrOwnd')?.value?.trim()?.toUpperCase() || 'CONC';
      if (!type) continue;
      const key = `${type}_${ownership}`;
      if (seen.has(key)) {
        return { duplicateContainerOwnership: true };
      }
      seen.add(key);
    }
    return null;
  }
  
  onMenuClick(): void {
    this.showSubtaskMenu = !this.showSubtaskMenu;
  }
  
  onContainerChange(): void {
  this.evaluateRadioAvailability();
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.position-relative')) {
      this.showSubtaskMenu = false;
    }
    const clickedInsideHelp = target.closest('.dropdown-menu') || target.closest('input');
    if (!clickedInsideHelp) {
      this.hideHelp();
    }
  }

  onHelpKeyDown(event: KeyboardEvent, fieldName: string, filteredList: any[], selectFn: (item: any) => void) {
    if (!filteredList || filteredList.length === 0) return;
    if (!(fieldName in this.highlightedIndices)) {
      this.highlightedIndices[fieldName] = -1;
    }
    let idx = this.highlightedIndices[fieldName];
    const lastIndex = filteredList.length - 1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        idx = idx < lastIndex ? idx + 1 : 0;
        this.highlightedIndices[fieldName] = idx;
        break;
      case 'ArrowUp':
        event.preventDefault();
        idx = idx > 0 ? idx - 1 : lastIndex;
        this.highlightedIndices[fieldName] = idx;
        break;
      case 'Enter':
        event.preventDefault();
        if (idx >= 0 && idx <= lastIndex) {
          selectFn(filteredList[idx]);
        }
        break;
      case 'Escape':
        this.showStationDropdown = false;
        this.highlightedIndices[fieldName] = -1;
        break;
    }
  }
  
  openContainerModal(): void {
    this.isContainerModalOpen = true;
  }
  
  closeContainerModal(): void {
    this.isContainerModalOpen = false;
    this.form.get('ALOTPaidby')?.markAsTouched();
    this.form.get('ALOTtype')?.markAsTouched();
  }
  
  onConsignerOrConsigneeRadioClick(): void {
    this.calculateContainerCharges('C'); // Or 'P', depending on logic
  }
}
