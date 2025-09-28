
  import { Component,  OnInit, ViewChild,ElementRef, AfterViewInit, HostListener } from '@angular/core';
  import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
  import { SharedModule } from 'src/app/theme/shared/shared.module';
  import { trigger, style, transition, animate } from '@angular/animations';
  import { FormArray, FormsModule } from '@angular/forms';
  import { HelpService } from 'src/app/services/help.service';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { GateserviceService } from 'src/app/services/gateservice.service';
  import { FormValidationService } from 'src/app/services/form-validation.service';
  import { DateServiceService } from 'src/app/shared/Date/date-service.service';
  import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
  import { LoaderComponent } from 'src/app/theme/shared/components/loader/loader.component';
  
  
  
       interface ContainerInfo {
    ALOTctnrNo: string;
    ALOTctnrSize: string;
    ALOTctnrType: string;
    ALOTctnrOwnd?: string;
  }
  
         
         @Component({
           selector: 'app-indent-cancellation',
           standalone: true,
           imports: [SharedModule, FormsModule],
           templateUrl: './indent-cancellation.component.html',
           styleUrls: ['./indent-cancellation.component.scss'],
           animations: [
             trigger('fadeIn', [
               transition(':enter', [
                 style({ opacity: 0 }),
                 animate('300ms ease-in', style({ opacity: 1 })),
               ]),
             ]),
           ]
         })
         export class IndentCancellationComponent implements OnInit {
       
           // Form-related properties
           form: any = {
             
           };
           
           isLoading: boolean = false;
           invalidFields: string[] = [];
         filledStatus: { [key: string]: boolean } = {};
         fieldLabels: { [key: string]: string } = {};
         
          
           form1Visible: boolean = true;
           form2Visible: boolean = false;
         
           // Help data
           helpData: any[] = [];
           TrmnlData: any[]= [];
           TrmnlDataTO: any[]= [];
           BsnsTypeData: any[]= [];
           StateData: any[]= [];
           CtnrTypeData: any[]= [];
  
           filteredCmdtList: any[] = [];
           filteredTrmnlList: any[]=[];
           filteredStateList: any[]=[];
           filteredCtnrTypeList: any[]=[];
           filteredBsnsTypeList: any[]=[];
  
           selectedCmdtCode: string = '';
           selectedCmdtDesc: string = '';
           selectedCmdtType: string = '';
         
           consignerHelpData: any[] = [];
           filteredConsignerList: any[] = [];
         
           
           consigneeHelpData: any[] = [];
           filteredConsigneeList: any[] = [];
         
           
           selectedCnsrCode: string = '';
           selectedCnsrName: string = '';
         
           selectedCgneCode: string = '';
           selectedCgneName: string = '';
         
           consignerIdHelpData: any[] = [];
           filteredConsignerIdList: any[] = [];
           selectedConsignerId: string = '';
  
           
           consignerPickData: any[] = [];
           filteredConsignerPickList: any[] = [];
           selectedConsignerPick: string = '';
  
           consigneePickData: any[] = [];
           filteredConsigneePickList: any[] = [];
           selectedConsigneeDlvr: string = '';
  
           consigneeIdHelpData: any[] = [];
           filteredConsigneeIdList: any[] = [];
           selectedConsigneeId: string = '';
         
           selectedCnsrAddress: string = '';
           selectedCnsrCity: string = '';
           selectedCnsrState: string = '';
           selectedCnsrPhone: string = '';
           selectedCnsrEmail: string = '';
           selectedCnsrGSTN: string = '';
           selectedCnsrpickup: string = '';
           selectedCnsrdist: string = '';
         
           
           selectedCgneAddress: string = '';
           selectedCgneCity: string = '';
           selectedCgneState: string = '';
           selectedCgnePhone: string = '';
           selectedCgneEmail: string = '';
           selectedCgneGSTN: string = '';
           selectedCgnedlvr: string = '';
           selectedCgnedist: string = '';
         
           consigneePickupPoint: string = '';
           isPickupPointFilled = true;
           isOwnedChecked : boolean= false;
           currentDateTime: string = '';
  
           todayFormatted: string = '';
           tomorrowFormatted: string = '';
         
           // Table rows
           users = Array.from({ length: 2 }, () => ({ CtnrType: '', CtnrSize: '', CtnrNo: '' , ownershipType: '' }));
           @ViewChild('scrollContainer') scrollContainer!: ElementRef;
           @ViewChild('formWrapper', { static: false }) formWrapper!: ElementRef;
           
         Object: any;
           
           
  
         createContainerGroup(): FormGroup {
    return this.fb.group({
      ALOTctnrType: ['', Validators.required],
      ALOTctnrSize: ['', Validators.required],
      ALOTctnrNo: ['', Validators.required],
      ALOTctnrOwnd: ['',]  // Add validator conditionally if needed
    });
  }
  
         
           
           constructor(private helpService: HelpService,private fb: FormBuilder, private router: Router,private gateservice:GateserviceService,public formValidator :FormValidationService,public Datevalidation:DateServiceService) {
               this.form = this.fb.group({
               ALOTsttnfrm: ['', Validators.required],
               ALOTrateType: ['N', Validators.required],
               ALOTcurrDt: ['', Validators.required],
               ALOTsrvcMd: ['', Validators.required],
               ALOTreqdDt: [{ value: '', disabled: true }],
               ALOTdlvrDt: [{ value: '', disabled: true }],
               ALOTrebooking: [''],
               ALOTrake: [''],
               ALOTowned: [''],
               ALOTsttnto: ['', Validators.required],
               ALOTpymntTyp: ['', Validators.required],
               ALOTcmdtCode: ['', Validators.required],
               ALOTcmdtDesc: ['', Validators.required],
               ALOTcnsrCode: ['', Validators.required],
               ALOTcnsrName: ['', Validators.required],
               ALOTcnsrId: ['',Validators.required],
               ALOTcnsrAdrs:['',Validators.required],
               ALOTcnsrcity: ['',Validators.required],
               ALOTcnsrstat: ['',Validators.required],
               ALOTcnsrPhon: ['',Validators.required],
               ALOTcnsremail: ['',Validators.required],
               ALOTcnsrGstno: ['',Validators.required],
               ALOTcnsrDist: [{ value: '', disabled: true }],
       
               ALOTcnsrPikup: [{ value: '', disabled: true }],
               ALOTcnseCode: ['', Validators.required],
               ALOTcnseName: ['', Validators.required],
               ALOTcnseId: ['', Validators.required],
               ALOTcnseAdrs: ['', Validators.required],
               ALOTcnsecity: ['', Validators.required],
               
               ALOTcnsestat: ['', Validators.required],
               ALOTcnsePhon: ['', Validators.required],
               ALOTcnseemail: ['', Validators.required],
               ALOTcnseGstno: ['', Validators.required],
               ALOTcnseDist: [{ value: '', disabled: true }],
               ALOTcnseDlvr: [{ value: '', disabled: true }],
       
               ALOTcontainerArray: this.fb.array([this.createContainerGroup()], { validators: [this.validateUniqueContainerOwnership] }),
               ALOTPaidby: ['', Validators.required],
               ALOTtype: ['', Validators.required],
               ALOTamount:['', Validators.required],
               
             });
               
             }
  
             
         
  ngOnInit(): void {
  
  
    this.form.get('ALOTPaidby')?.valueChanges.subscribe(() => {
      this.form.get('ALOTtype')?.reset();
      this.form.get('ALOTamount')?.setValue('');
      this.isRadioEnabled = false;
    });
  
  
    this.form.get('ALOTsttnfrm')?.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe((stationCode: string) => {
  
      if (stationCode) {
        
        this.helpService.getConsignerHelpData(stationCode).subscribe({
          next: (data) => {
            console.log('Consigner Data:', data);
            // Optional: No need to assign here, it's handled by the next block
          },
          error: (err) => {
            console.error('Error fetching help data:', err);
          }
        });
      }
    });
  
  this.helpService.cnsrcustomerData$.subscribe(data => {
    if (data?.result) {
      
      this.consignerHelpData = data.result;
      this.filteredConsignerList = [...this.consignerHelpData];
      console.log('Consigner Code Help Data:', this.consignerHelpData);
    }
  });
  
  
  
  
  
            this.helpService.helpData$.subscribe(data => {
          if (data?.result) {
            this.helpData = data.result;
            this.filteredCmdtList = [...this.helpData];
            //console.log('CMDT data Data received:', this.helpData);
          }
        });
  
              this.helpService.TrmnlCode$.subscribe(data => {
              if (data?.result) {
              this.TrmnlData = data.result;
              this.filteredStationList = [...this.TrmnlData]; // Initialize with full list
              console.log('Terminal Data received:', this.TrmnlData);
              }
              });
  
             
  
  
  
              this.helpService.CtnrType$.subscribe(data => {
                if (data?.result) {
                  this.containerHelpData = data.result;         // ✅ this is the correct one
                    this.filteredCtnrTypeList = [...data.result]; // optional, if you use this elsewhere
                //console.log('Ctnr Type Data received:', this.containerHelpData);
              }
              });
  
            
  
         const today = new Date();
         const tomorrow = new Date(today);
         const yyyy = today.getFullYear();
         const mm = (today.getMonth() + 1).toString().padStart(2, '0');
         const dd = today.getDate().toString().padStart(2, '0');
  
          this.todayFormatted = `${yyyy}-${mm}-${dd}`;
          tomorrow.setDate(today.getDate() + 1); // No error, Date object
  
          this.tomorrowFormatted = tomorrow.toISOString().split('T')[0];
  
         this.form.get('ALOTcurrDt')?.setValue(this.todayFormatted);
        this.currentDateTime = this.formatDateTimeLocal(today);
        
   
           }
         
   
  formatDateTimeLocal(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }
  
  
  endOfDay: string = '';
  
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
  currentDate: string = '';
  
  setCurrentDate(): void {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.currentDate = `${day}-${month}-${year}`;
  }
  
  formatToDDMMYY(dateStr?: string): string {
    if (!dateStr || typeof dateStr !== 'string') {
      return ''; // or return null if your API expects null
    }
  
    const parts = dateStr.split('-');
    if (parts.length !== 3) {
      return dateStr; // return as-is if format is wrong
    }
  
    const [yyyy, mm, dd] = parts;
    return `${dd}-${mm}-${yyyy.slice(2)}`;
  }
  
 
  
  
  
  filteredStationList: any[] = [];     // Filtered for dropdown
  selectedStationCode: string = '';    // For input display
  showStationDropdown: boolean = false;
  stationDropdownTimeout: any;
  
  filterStationList(search: string) {
    if (!search) {
      this.filteredStationList = [...this.TrmnlData];
      return;
    }
    
    this.filteredStationList = this.TrmnlData.filter(station =>
      station.p_TrmnlCode?.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  selectStationCode(station: any) {
    this.selectedStationCode = station.p_TrmnCode;
    this.form.get('ALOTsttnfrm')?.setValue(station.p_TrmnCode);
    this.showStationDropdown = false;
    this.highlightedIndices['ALOTsttnfrm'] = -1; // reset highlight for this field
  
    // 🚨 Clear dependent address fields before fetching new ones
    this.form.get('ALOTcnsrCode')?.reset();
    this.form.get('ALOTcnsrName')?.reset();
  
    this.form.get('ALOTcnsrId')?.reset();
    this.form.get('ALOTcnsrAdrs')?.reset();
    this.form.get('ALOTcnsrcity')?.reset();
    this.form.get('ALOTcnsrstat')?.reset();
    this.form.get('ALOTcnsrPhon')?.reset();
    this.form.get('ALOTcnsremail')?.reset();
    this.form.get('ALOTcnsrGstno')?.reset();
    this.selectedConsignerId = ''; // Clear selected consigner ID variable as well
  }
  
  hideStationDropdownWithDelay() {
    this.stationDropdownTimeout = setTimeout(() => {
      this.showStationDropdown = false;
    }, 200);
  }
  onStationFromInputChange(event: any) {
    const value = event.target.value.toUpperCase().replace(/[^A-Z]/g, ''); // allow only letters
    this.selectStationCode = value;
    this.form.get('ALOTsttnfrm')?.setValue(value);
  }
  
  validateStationFromInput() {
    const enteredCode = this.selectedStationCode.trim().toUpperCase();
  
    const isValid = this.TrmnlData.some(
      station => station.p_TrmnCode === enteredCode
    );
  
    if (!isValid) {
      // Clear the value
      this.form.get('ALOTsttnfrm')?.setValue('');
  
      // Force validation class to show red by touching the field
      this.form.get('ALOTsttnfrm')?.markAsTouched();
      this.form.get('ALOTsttnfrm')?.markAsDirty();
    }
  }
  
  
  
  
  containerHelpData: any[] = [];          // API data: p_CntrType, p_CntrSize
  filteredContainerTypes: any[] = [];     // Filtered for dropdown
  showContainerHelp: boolean[] = [];      // Controls dropdown visibility per row
  containerDropdownTimeouts: any[] = [];  // For delayed hide
  
  
 
  
  
  hideContainerDropdownWithDelay(index: number) {
    this.containerDropdownTimeouts[index] = setTimeout(() => {
      this.showContainerHelp[index] = false;
    }, 200);
  }
  
  clearContainerDropdownTimeout(index: number) {
    clearTimeout(this.containerDropdownTimeouts[index]);
  }
  
  
  
  
  
  
  showConsignerIDDropdown: boolean = false;
  
  filterConsignerIdFromEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchValue = input.value;
  
    this.form.get('ALOTcnsrId')?.setValue(searchValue); // Ensure Reactive Form is updated
    this.filterConsignerIdList(searchValue);
    this.showConsignerIDDropdown = true;
  }
  
  filterConsignerIdList(search: string) {
    this.filteredConsignerIdList = this.consignerIdHelpData.filter(item =>
      item.p_CustID.toLowerCase().includes(search.toLowerCase()) ||
      item.p_CustName.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  consignerDropdownTimeout: any;
  clearConsignerIDDropdownTimeout() {
    clearTimeout(this.consignerDropdownTimeout);
  }
  
  selectConsignerID(item: any) {
    this.selectedConsignerId = item.p_CustID;
    this.form.get('ALOTcnsrId')?.setValue(item.p_CustID);
  
    this.onCustomerIdChangeCnsr(item.p_CustID);
  
    this.showConsignerIDDropdown = false;
  }
  
  hideConsignerIDDropdownWithDelay() {
    this.consignerDropdownTimeout = setTimeout(() => {
      this.showConsignerIDDropdown = false;
    }, 200);
  }
  
  
  
  
  
  showConsigneeIDDropdown: boolean = false;
  
  filterConsigneeIdFromEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchValue = input.value;
  
    this.form.get('ALOTcnseId')?.setValue(searchValue); // Ensure Reactive Form is updated
    this.filterConsigneeIdList(searchValue);
    this.showConsigneeIDDropdown = true;
  }
  
  filterConsigneeIdList(search: string) {
    this.filteredConsigneeIdList = this.consigneeIdHelpData.filter(item =>
      item.p_CustID.toLowerCase().includes(search.toLowerCase()) ||
      item.p_CustName.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  consigneeDropdownTimeout: any;
  clearConsigneeIDDropdownTimeout() {
    clearTimeout(this.consigneeDropdownTimeout);
  }
  
  selectConsigneeID(item: any) {
    this.selectedConsigneeId = item.p_CustID;
    this.form.get('ALOTcnseId')?.setValue(item.p_CustID);
  
    this.onCustomerIdChangeCgne(item.p_CustID);
  
    this.showConsigneeIDDropdown = false;
  }
  
  hideConsigneeIDDropdownWithDelay() {
    this.consigneeDropdownTimeout = setTimeout(() => {
      this.showConsigneeIDDropdown = false;
    }, 200);
  }
  
  
           showConsignerDropdown = false;
        
         filterConsignerList(value: string) {
      
    this.filteredConsignerList = this.consignerHelpData.filter(item =>
      item.p_CustCode.toLowerCase().includes(value.toLowerCase()) ||
      item.p_CustName.toLowerCase().includes(value.toLowerCase())
    );
  }
          
  
         selectConsigner(item: any) {
    this.selectedCnsrCode = item.p_CustCode;
    this.selectedCnsrName = item.p_CustName;
  
    this.form.get('ALOTcnsrCode')?.setValue(item.p_CustCode);
    this.form.get('ALOTcnsrName')?.setValue(item.p_CustName);
    this.form.get('ALOTcnsrCode')?.markAsTouched();
    this.form.get('ALOTcnsrName')?.markAsTouched();
    this.showConsignerDropdown = false;
  
    // 🚨 Clear dependent address fields before fetching new ones
    this.form.get('ALOTcnsrId')?.reset();
    this.form.get('ALOTcnsrAdrs')?.reset();
    this.form.get('ALOTcnsrcity')?.reset();
    this.form.get('ALOTcnsrstat')?.reset();
    this.form.get('ALOTcnsrPhon')?.reset();
    this.form.get('ALOTcnsremail')?.reset();
    this.form.get('ALOTcnsrGstno')?.reset();
    this.selectedConsignerId = ''; // Clear selected consigner ID variable as well
  
    const stationCode = this.form.get('ALOTsttnfrm')?.value;
  
    if (stationCode && item.p_CustCode) {
      this.helpService.getCustomerIdHelpData(item.p_CustCode, stationCode).subscribe({
        next: (data) => {
          console.log('Consigner ID Help Data:', data);
        },
        error: (err) => {
          console.error('Error fetching Customer ID Help Data:', err);
        }
      });
    } else {
      console.warn('❌ Missing custCode or stationCode for final API call');
    }
  
    if (stationCode) {
      this.helpService.getpickupDlvrData( stationCode).subscribe({
        next: (data) => {
          console.log('Consigner Pick Data:', data);
        },
        error: (err) => {
          console.error('Error fetching Consigner Pick Data:', err);
        }
      });
    } else {
      console.warn('❌ Missing custCode or stationCode for final API call');
    }
  
    this.helpService.custIdData$.subscribe(data => {
      if (data?.result) {
        this.consignerIdHelpData = data.result;
        this.filteredConsignerIdList = [...this.consignerIdHelpData];
        console.log('Consigner ID Help Data:', this.consignerIdHelpData);
      }
    });
  
    this.helpService.PickupDlvrData$.subscribe(data => {
      if (data?.result) {
        this.consignerPickData = data.result;
        this.filteredConsignerPickList = [...this.consignerPickData];
        console.log('Consigner Pick Data:', this.consignerPickData);
      }
    });
  
  }
  
         
         hideConsignerDropdownWithDelay() {
           setTimeout(() => {
             this.showConsignerDropdown = false;
           }, 200);
         }
  
        
         showConsigneeDropdown = false;
         
         filterConsigneeList(value: string) {
           this.filteredConsigneeList = this.consigneeHelpData.filter(item =>
             item.p_CustCode.toLowerCase().includes(value.toLowerCase()) ||
             item.p_CustName.toLowerCase().includes(value.toLowerCase()) 
             
           );
         }
  
         selectConsignee(item: any) {
           this.selectedCgneCode = item.p_CustCode;
           this.selectedCgneName = item.p_CustName; // <-- storing the name
  
           // Update form controls so validation and UI are in sync
    this.form.get('ALOTcnseCode')?.setValue(item.p_CustCode);
    this.form.get('ALOTcnseName')?.setValue(item.p_CustName);
  
    // Mark them as touched to trigger validation visuals if needed
    this.form.get('ALOTcnseCode')?.markAsTouched();
    this.form.get('ALOTcnseName')?.markAsTouched();
  
           this.showConsigneeDropdown = false;
  
           // 🚨 Clear dependent address fields before fetching new ones
    this.form.get('ALOTcnseId')?.reset();
    this.form.get('ALOTcnseAdrs')?.reset();
    this.form.get('ALOTcnsecity')?.reset();
    this.form.get('ALOTcnsestat')?.reset();
    this.form.get('ALOTcnsePhon')?.reset();
    this.form.get('ALOTcnseemail')?.reset();
    this.form.get('ALOTcnseGstno')?.reset();
    this.selectedConsigneeId = ''; // Clear selected consigner ID variable as well
  
  
    const stationCode = this.form.get('ALOTsttnto')?.value;
  
    if (stationCode && item.p_CustCode) {
      this.helpService.getCustomerIdHelpData(item.p_CustCode, stationCode).subscribe({
        next: (data) => {
          console.log('Consignee ID Help Data:', data);
        },
        error: (err) => {
          console.error('Error fetching Customer ID Help Data:', err);
        }
      });
    } else {
      console.warn('❌ consignee Missing custCode or stationCode for final API call');
    }
  
    if (stationCode) {
      this.helpService.getpickupDlvrData( stationCode).subscribe({
        next: (data) => {
          console.log('Consignee Pick Data:', data);
        },
        error: (err) => {
          console.error('Error fetching Consigner Pick Data:', err);
        }
      });
    } else {
      console.warn('❌ consignee Missing custCode or stationCode for final API call');
    }
  
    this.helpService.custIdData$.subscribe(data => {
      if (data?.result) {
        this.consigneeIdHelpData = data.result;
        this.filteredConsigneeIdList = [...this.consigneeIdHelpData];
        console.log('Consignee ID Help Data:', this.consigneeIdHelpData);
      }
    });
  
    this.helpService.PickupDlvrData$.subscribe(data => {
      if (data?.result) {
        this.consigneePickData = data.result;
        this.filteredConsigneePickList = [...this.consigneePickData];
        console.log('Consignee Pick Data:', this.consigneePickData);
      }
    });
  
         }
         
         hideConsigneeDropdownWithDelay() {
           setTimeout(() => {
             this.showConsigneeDropdown = false;
           }, 200);
         }
  
        
         
         
           
   onCustomerIdChangeCnsr(consignerId: string) {
    const custCode = this.form.get('ALOTcnsrCode')?.value;
    const stationCode = this.form.get('ALOTsttnfrm')?.value;
  
    if (!custCode || !stationCode) {
      console.warn('❌ consigner 1 Missing custCode or stationCode for CustomerId Help');
      return;
    }
  
    // Reset fields first
    this.form.get('ALOTcnsrAdrs')?.reset();
    this.form.get('ALOTcnsrcity')?.reset();
    this.form.get('ALOTcnsrstat')?.reset();
    this.form.get('ALOTcnsrPhon')?.reset();
    this.form.get('ALOTcnsremail')?.reset();
    this.form.get('ALOTcnsrGstno')?.reset();
  
    this.selectedConsignerId = consignerId;
  
    this.helpService.getCustomerIdHelpData(custCode, stationCode).subscribe({
      next: (data) => {
        if (data?.result) {
          this.consignerIdHelpData = data.result;
  
          this.filteredConsignerIdList = this.consignerIdHelpData.filter(item =>
            item.p_CustID.toLowerCase().includes(consignerId.toLowerCase())
          );
  
          const found = this.consignerIdHelpData.find(item => item.p_CustID === consignerId);
  
          this.selectedCnsrAddress = found?.p_CustAddr || '';
          this.selectedCnsrCity = found?.p_CustCity || '';
          this.selectedCnsrState = found?.p_StateCode || '';
          this.selectedCnsrPhone = found?.p_CustPhone || '';
          this.selectedCnsrEmail = found?.p_CustEmail || '';
          this.selectedCnsrGSTN = found?.p_GSTNumber || '';
  
          if (found) {
            this.form.get('ALOTcnsrAdrs')?.setValue(found.p_CustAddr);
            this.form.get('ALOTcnsrcity')?.setValue(found.p_CustCity);
            this.form.get('ALOTcnsrstat')?.setValue(found.p_StateCode);
            this.form.get('ALOTcnsrPhon')?.setValue(found.p_CustPhone);
            this.form.get('ALOTcnsremail')?.setValue(found.p_CustEmail);
            this.form.get('ALOTcnsrGstno')?.setValue(found.p_GSTNumber);
          } else {
            console.warn('⚠️ No consigner ID match found');
          }
        }
      },
      error: (err) => {
        console.error('❌ Error fetching CustomerIdHelpData:', err);
      }
    });
  }
  
  
  
            onCustomerIdChangeCgne(consigneeId: string) {
  
              const custCode = this.form.get('ALOTcnseCode')?.value;
              const stationCode = this.form.get('ALOTsttnto')?.value;
  
              if (!custCode || !stationCode) {
              console.warn('❌consignee 1 Missing custCode or stationCode for CustomerId Help');
              return;
              }
  
              // Reset fields first
              this.form.get('ALOTcnseAdrs')?.reset();
              this.form.get('ALOTcnsecity')?.reset();
              this.form.get('ALOTcnsestat')?.reset();
              this.form.get('ALOTcnsePhon')?.reset();
              this.form.get('ALOTcnseemail')?.reset();
              this.form.get('ALOTcnseGstno')?.reset();
  
              this.selectedConsigneeId = consigneeId;
         
              this.helpService.getCustomerIdHelpData(custCode, stationCode).subscribe({
                  next: (data) => {
                   if (data?.result) {
                  this.consigneeIdHelpData = data.result;
                  this.filteredConsigneeIdList = this.consigneeIdHelpData.filter(item =>
                    item.p_CustID.toLowerCase().includes(consigneeId.toLowerCase())
                  );
         
                  const found = this.consigneeIdHelpData.find(item => item.p_CustID === consigneeId);
                 
                  this.selectedCgneAddress = found ? found.p_CustAddr : '';
                  this.selectedCgneCity = found ? found.p_CustCity : '';
                  this.selectedCgneState = found ? found.p_StateCode : '';
                  this.selectedCgnePhone = found ? found.p_CustPhone : '';
                  this.selectedCgneEmail = found ? found.p_CustEmail : '';
                  this.selectedCgneGSTN = found ? found.p_GSTNumber : '';
  
                  // ✅ Set values to FormControls so validation works
         
  
           if (found) {
          this.form.get('ALOTcnseAdrs')?.setValue(found.p_CustAddr);
           this.form.get('ALOTcnsecity')?.setValue(found.p_CustCity);
           this.form.get('ALOTcnsestat')?.setValue(found.p_StateCode);
           this.form.get('ALOTcnsePhon')?.setValue(found.p_CustPhone);
           this.form.get('ALOTcnseemail')?.setValue(found.p_CustEmail);
           this.form.get('ALOTcnseGstno')?.setValue(found.p_GSTNumber);
   } else {
     console.warn('⚠️ No consigner data found!');
   }
   }},
      error: (err) => {
        console.error('❌ Error fetching CustomerIdHelpData:', err);
      }
                 
                
              });
            }
         
           
         get containerArray(): FormArray {
    return this.form.get('ALOTcontainerArray') as FormArray;
  }
  
  addRow() {
    const lastIndex = this.containerArray.length - 1;
  
    if (!this.containerArray.at(lastIndex).valid) {
      this.containerArray.at(lastIndex).markAllAsTouched();
      return;
    }
  
    const group = this.createContainerGroup();
    this.containerArray.push(group);
  
    this.showContainerHelp.push(false);
    this.containerDropdownTimeouts.push(null);
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
    this.showContainerHelp.splice(index, 1);
  this.containerDropdownTimeouts.splice(index, 1);
  this.clearAmountAndRadio();
  
  }
  
         
         
  private scrollToBottom() {
    try {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
  
  
        
       
           onSubmit(){
  
          
            
             this.formValidator.markAllFieldsTouched(this.form);
         this.invalidFields = this.formValidator.getInvalidFields(this.form);
       
         // ✅ Rebuild filledStatus from scratch each time
         this.invalidFields = this.invalidFields.filter(field => {
         const isFilled = !!this.form.get(field)?.value;
         this.filledStatus[field] = isFilled;
         return !isFilled; // keep only if still invalid
       });
       
         for (const field of this.invalidFields) {
           const controlValue = this.form.get(field)?.value;
           this.filledStatus[field] = !!controlValue; // true if has value, false otherwise
         }
       
         Object.keys(this.form.controls).forEach(key => {
    const control = this.form.get(key);
    if (control && control.invalid) {
      console.warn(`Invalid field: ${key}`, control.errors);
    }
  });
  
  
           if (this.form.invalid) {
           
           return; // 🚫 Don't submit if form is invalid
         }
       
                     
                 const formValues = this.form.value;
  
                const CNDGDate = this.formatToDDMMYY(formValues.ALOTcurrDt || '');
                const REQDDate = this.formatToDDMMYY(formValues.ALOTreqdDt || '');
                const DLVRDate = this.formatToDDMMYY(formValues.ALOTdlvrDt || '');
                console.log(formValues.ALOTcontainerArray);
  
                const containerArray = formValues.ALOTcontainerArray || [];
  
                const containerSizes = containerArray.map((c: { ALOTctnrSize: any }) => String(c.ALOTctnrSize));
                const containerTypes = containerArray.map((c: { ALOTctnrType: any }) => String(c.ALOTctnrType));
                const numberOfContainers = containerArray.map((c: { ALOTctnrNo: any }) => String(c.ALOTctnrNo));
  
  
       
                 // Prepare the flat payload - SRVC at root level, no wrapping object
                 const finalPayload = {
                 SRVC: "CTREGNSAVE",
                 BACK_TRMLFLAG: "N", //formValues.JBODcnIdPrno
                 CMDT_CODE: formValues.ALOTcmdtCode, //"ACAN",
                 CNSE_ADDR: formValues.ALOTcnseAdrs, //"6,MISSION COMPOUND , LALBAGH ROAD CROSS BANGALORE.",
                 CNSE_CITY: formValues.ALOTcnsecity, //"BANGALORE",
                 CNSE_CODE: formValues.ALOTcnseCode, //"WSIL",
                 CNSE_EMAIL: formValues.ALOTcnseemail, //"32929314,222703",
                 CNSE_NAME: formValues.ALOTcnseName, //"WESTERN CARRIERS (INDIA)LTD",
                 CNSE_PHONE: formValues.ALOTcnsePhon, //"32929314,222703",
                 CNSG_DATE: CNDGDate,
                 CNSR_ADDR: formValues.ALOTcnseAdrs, //"333/141, PADAMPUR, BY PASS ROAD VYASANARAR MNICIPALITY,",
                 CNSR_CITY: formValues.ALOTcnsrcity, //"JAJPUR",
                 CNSR_CODE: formValues.ALOTcnsrCode, //"WCLM",
                 CNSR_NAME: formValues.ALOTcnsrName, //"WESTERN CARRIERS INDIA LTD",
                 CNTR_SIZE: containerSizes, //["20", "20"],
                 CNTR_TYPE: containerTypes, //["20EO", "20ES"],
                 DLVR_DATE: DLVRDate,
                 NUMB_OFCNTR: numberOfContainers, //["4", "5"],
                 PDA_MR_CAFLAG: formValues.ALOTtype, //"N",
                 PYMT_TYPE: formValues.ALOTpymntTyp, //"P",
                 RE_BOOKFLAG: "N",
                 REQD_DATE: REQDDate,
                 SRVC_MODE: formValues.ALOTsrvcMd, //"DD",
                 STTN_FROM: formValues.ALOTsttnfrm, //"TICD",
                 STTN_TO: formValues.ALOTsttnto, //"WFD",
                 USER_ID: "CRIS",
                 WAIVE_FLAG: "Y",
                 ACTIVE_FLAG: "N",
                 CNSR_DIST: formValues.ALOTcnsrDist, //"55",
                 CNSE_DIST: formValues.ALOTcnseDist, //"55",
                 REGN_AMNT: formValues.ALOTamount, //"0",
                 RAKE_FLAG: "N",
                 JV_LOGIN: "*",
                 TRMN_LOGIN: formValues.ALOTsttnfrm, //"TICD",
                 USER_LOGIN: "CRIS",
                 CNSR_ID: formValues.ALOTcnsrId, //"ORNRO0TICDB00524",
                 CNSE_ID: formValues.ALOTcnseId, //"KASRO00WFDB00204",
                 CNSR_STATE: formValues.ALOTcnsrstat, //"OR",
                 CNSE_STATE: formValues.ALOTcnsestat, //"KA",
                 CNSR_GSTN: formValues.ALOTcnsrGstno, //"21AABCW1961A1ZZ",
                 CNSE_GSTN: formValues.ALOTcnseGstno, //"29AABCW1961A1ZJ",
                 DLVR_PNT: formValues.ALOTcnseDlvr, //"DODDABALLAPUR",
                 PKUP_PNT: formValues.ALOTcnsrPikup, //"ALIPUR DELHI" 
                 EBOOK_FLAG: 'Y',   
               };
       
                 console.log('📦 Allotment Order:', finalPayload);
       
                  this.gateservice.submitallotmentForm(JSON.stringify(finalPayload)).subscribe({
    next: (res: any) => {
      console.log('✅ Submitted successfully', res);
  
      const data = res.body;
  
      console.log('CNSG_ID:', data.CNSG_ID);
      console.log('ERR_CODE:', data.ERR_CODE);
  
      if (data?.ERR_CODE) {
        console.error(`❌ Error: Code = ${data.ERR_CODE}, Message = ${data.ERR_MSG || 'No message'}`);
        this.isLoading = false;
        this.router.navigate(['/failedstat'], {
          state: {
            errCode: data.ERR_CODE,
            errMsg: data.ERR_MSG || ''
          }
        });
      } else if (data?.CNSG_ID) {
        console.log(`✅ CNSG_ID found: ${data.CNSG_ID}`);
        this.isLoading = false;
        this.router.navigate(['/successstat'], {
          state: { requestId: data.CNSG_ID }
        });
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
  
       
  
  isRadioEnabled: boolean = false;
  
  clearAmountAndRadio() {
    this.form.get('ALOTAmount')?.setValue('');
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
  
  validateContainerRowsBeforeRadioOrAmount(): boolean {
    for (let i = 0; i < this.containerArray.length; i++) {
      const row = this.containerArray.at(i);
      const type = row.get('ALOTctnrType')?.value;
      const size = row.get('ALOTctnrSize')?.value;
      const no = row.get('ALOTctnrNo')?.value;
  
      if ((type || size) && !no) {
        alert(`Please enter No of Containers in row ${i + 1}`);
        return false;
      }
    }
  
    return true;
  }
  
  
  onConsignerOrConsigneeRadioClick() {
    if (!this.validateContainerRowsBeforeRadioOrAmount()) {
      return;
    }
  
    this.evaluateRadioAvailability(); // or any other logic you want to do
  }
  
  
  helpDropdownTop: number = 0;
  helpDropdownLeft: number = 0;
  helpDropdownIndex: number | null = null;
  
  
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
  }
  
  
  
  
  showHelp(index: number, inputElement: HTMLElement) {
    this.helpDropdownIndex = index;
  
    const rect = inputElement.getBoundingClientRect();
    this.helpDropdownTop = rect.bottom + window.scrollY;
    this.helpDropdownLeft = rect.left + window.scrollX;
  
    this.filterContainerType(index); // Load filtered list
  }
  
  hideHelp() {
    this.helpDropdownIndex = null;
  }
  
  
  validateUniqueContainerOwnership(formArray: AbstractControl): ValidationErrors | null {
    const seen = new Set();
    const controls = (formArray as FormArray).controls;
  
    for (let control of controls) {
      const type = control.get('ALOTctnrType')?.value?.trim()?.toUpperCase();
      const ownership = control.get('ALOTctnrOwnd')?.value?.trim()?.toUpperCase() || 'CONC'; // default if not selected
  
      if (!type) continue;
  
      const key = `${type}_${ownership}`;
      if (seen.has(key)) {
        return { duplicateContainerOwnership: true };
      }
      seen.add(key);
    }
  
    return null;
  }
  
  onContainerChange() {
    const array = this.form.get('ALOTcontainerArray') as FormArray;
    array.updateValueAndValidity(); // Re-validate on any change
  }
  

  highlightedIndices: { [fieldName: string]: number } = {};
  enterPressedForField: { [fieldName: string]: boolean } = {};
  
  onHelpKeyDown(
    event: KeyboardEvent,
    fieldName: string,
    filteredList: any[],
    selectFn: (item: any) => void
  ) {
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
          this.enterPressedForField[fieldName] = true;
        }
        break;
  
      case 'Escape':
        this.showStationDropdown = false; // Adjust per field if needed
        this.highlightedIndices[fieldName] = -1;
        break;
    }
  }
  
  
  onInputBlur(fieldName: string) {
    if (this.enterPressedForField[fieldName]) {
      setTimeout(() => {
        this.showStationDropdown = false;
        this.highlightedIndices[fieldName] = -1;
        this.enterPressedForField[fieldName] = false;
      }, 150);
    } else {
      this.showStationDropdown = false;
      this.highlightedIndices[fieldName] = -1;
    }
  }
  
  
  
  
  
  
         }
         
         
       
         
         
       