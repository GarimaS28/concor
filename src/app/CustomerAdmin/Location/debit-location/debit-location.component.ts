
import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({  selector: 'app-debit-location',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './debit-location.component.html',
  styleUrl: './debit-location.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class DebitLocationComponent {
// Form-related properties
  form: FormGroup;
  cpdaList: any[] = [];
  locationsList: any[] = [];
  customerCodeList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // Add your services here
    // private cpdaService: YourServiceForCPDA,
    // private locationService: YourServiceForLocations,
    // private customerService: YourServiceForCustomerCode
  ) {
    // Initialize the form group with your fields
    this.form = this.fb.group({
    DBTLocnSttnFrm: [''],
    DBTLocnCurrentDate: [''],
      DBTLocnlistCPDA: ['', Validators.required],
      DBTLocnlistLocns: ['', Validators.required],
      DBTLocncustCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // This is where you would call your services to populate the dropdowns
    // For now, we are using dummy data as requested.
    this.cpdaList = [
      { id: 'cpda1', name: 'XYZ CPDA 1' },
      { id: 'cpda2', name: 'XYZ CPDA 2' },
      { id: 'cpda3', name: 'XYZ CPDA 3' }
    ];

    this.locationsList = [
      { id: 'location1', name: 'XYZ Location 1' },
      { id: 'location2', name: 'XYZ Location 2' },
      { id: 'location3', name: 'XYZ Location 3' }
    ];

    this.customerCodeList = [
      { id: 'cust1', name: 'XYZ Cust Code 1' },
      { id: 'cust2', name: 'XYZ Cust Code 2' },
      { id: 'cust3', name: 'XYZ Cust Code 3' }
    ];

    const today = new Date();
  const yyyy = today.getFullYear();
  const mm = (today.getMonth() + 1).toString().padStart(2, '0');
  const dd = today.getDate().toString().padStart(2, '0');
  const todayFormatted = `${yyyy}-${mm}-${dd}`;
  this.form.get('DBTLocnCurrentDate')?.setValue(todayFormatted);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      alert("Form submitted!");
      const formValues = this.form.value;

      // Prepare the payload for your service call
      const finalPayload = {
        listCPDA: formValues.listCPDA,
        listLocations: formValues.listLocations,
        customerCode: formValues.customerCode
      };

      console.log('📦 Add Debit Location Payload:', finalPayload);

      // This is where you would call your service to save the data
      // For example:
      // this.yourService.saveDebitLocation(finalPayload).subscribe({
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
      alert("Please fill out all required fields.");
    }
  }

  // Handle cancel button click
  onCancel(): void {
    console.log('❌ Form cancellation requested.');
    alert('Form cancelled!');
    // This is where you can add logic to navigate back or reset the form
    this.form.reset();
  }

  selectedFile: File | null = null;

onFileSelect(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}

removeFile(): void {
  this.selectedFile = null;
}

requests = [
  { date: new Date('2025-09-20'), id: 'REQ12345', cpda: 'XYZ CPDA 1', location: 'XYZ Location 1', custCode: 'CUST001', status: 'Pending' },
  { date: new Date('2025-09-21'), id: 'REQ67890', cpda: 'XYZ CPDA 2', location: 'XYZ Location 2', custCode: 'CUST002', status: 'Pending' },
  { date: new Date('2025-09-22'), id: 'REQ54321', cpda: 'XYZ CPDA 3', location: 'XYZ Location 3', custCode: 'CUST003', status: 'Pending' }
];




}


