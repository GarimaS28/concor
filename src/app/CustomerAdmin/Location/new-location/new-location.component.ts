import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-location',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-location.component.html',
  styleUrl: './new-location.component.scss',
  animations: [trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in', style({ opacity: 1 }))])])]
})
export class NewLocationComponent {
  // Form-related properties
  form: FormGroup;
  locationsList: any[] = [];
  selectedOption: string = ''; // default "Add Address"

  dummyData = [
    { DAVCNSGID: 'TICD2509389', DADCNSGDA: '24-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 3, DANCNTROUTSTD: 0 },
    { DAVCNSGID: 'TICD2509401', DADCNSGDA: '24-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 2, DANCNTROUTSTD: 2 },
    { DAVCNSGID: 'TICD2509402', DADCNSGDA: '24-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 1, DANCNTROUTSTD: 0 },
    { DAVCNSGID: 'TICD2509403', DADCNSGDA: '24-SEP-25', DAVS1: 'TICD', DAVS2: 'CTCS', DANCNTRRQRD: 2, DANCNTROUTSTD: 0 },
    { DAVCNSGID: 'TICD2509404', DADCNSGDA: '24-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 2, DANCNTROUTSTD: 0 },
    { DAVCNSGID: 'TICD2509297', DADCNSGDA: '19-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 2, DANCNTROUTSTD: 1 },
    { DAVCNSGID: 'TICD2509298', DADCNSGDA: '19-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 2, DANCNTROUTSTD: 0 },
    { DAVCNSGID: 'TICD2509332', DADCNSGDA: '21-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 1, DANCNTROUTSTD: 0 },
    { DAVCNSGID: 'TICD2509301', DADCNSGDA: '19-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 5, DANCNTROUTSTD: 0 },
    { DAVCNSGID: 'TICD2509302', DADCNSGDA: '19-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 3, DANCNTROUTSTD: 0 },
    { DAVCNSGID: 'TICD2509306', DADCNSGDA: '19-SEP-25', DAVS1: 'TICD', DAVS2: 'TNPM', DANCNTRRQRD: 2, DANCNTROUTSTD: 0 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
    // Add your services here
    // private locationService: YourServiceForLocations,
  ) {
    // Initialize the form group with your fields
    this.form = this.fb.group({
      NEWLocnSttnFrm: [''],
      NEWLocnCurrentDate: [''],
      NEWLocnlistLocns: ['', Validators.required],
      customerCode: [],
      legalName: [],
      AltCustname: [],
      tradeName: [],
      custgroup: [],
      cheqFlg: [],
      SrvctaxrgNo: [],
      pannumb: [],
      adhrnmbr: [],
      tanNumb: [],
      custtype: [],
      custgsttdstype: [],
      bacode: [],
      gsttdsdesc: [],
      excemtionflg: [],
      gsttdsnumb: [],
      add1: [],
      add2: [],
      city: [],
      phn: [],
      mob: [],
      fax: [],
      state: [],
      sizeflg: [],
      pincode: [],
      custid: [],
      servingterminal: [],
      email: [],
      Destfrmterminal: [],
      gstNumb: [],
      cpname: [],
      cpdesig: []
    });
  }

  ngOnInit(): void {
    // This is where you would call your service to populate the dropdown
    // For now, we are using dummy data as requested.
    this.locationsList = [
      { id: 'location1', name: 'XYZ Location 1' },
      { id: 'location2', name: 'XYZ Location 2' },
      { id: 'location3', name: 'XYZ Location 3' }
    ];

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0');
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    this.form.get('NEWLocnCurrentDate')?.setValue(todayFormatted);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      alert('Form submitted!');
      const formValues = this.form.value;

      // Prepare the payload for your service call
      const finalPayload = {
        listLocations: formValues.listLocations
      };

      console.log('📦 Add New Location Payload:', finalPayload);

      // This is where you would call your service to save the data
      // For example:
      // this.locationService.saveNewLocation(finalPayload).subscribe({
      //   next: (res: any) => {
      //     console.log('✅ Submitted successfully', res);
      //     alert('Form submitted successfully!');
      //     // Optional: Navigate to another page or reset the form
      //     this.router.navigate(['/success-page']);
      //   },
      //   error: (err: any) => {
      //     console.error('❌ Submission failed', err);
      //     alert('Something went wrong!');
      //   }
      // });
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // Handle cancel button click
  onCancel(): void {
    console.log('❌ Form cancellation requested.');
    alert('Form cancelled!');
    // This is where you can add logic to navigate back or reset the form
    this.form.reset();
  }
}
