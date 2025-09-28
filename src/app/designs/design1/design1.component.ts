
    import { Component, OnInit } from '@angular/core';
    import {
      FormBuilder,
      FormGroup,
      FormArray,
      FormControl,
      ReactiveFormsModule,
      Validators,
    } from '@angular/forms';
    import { CommonModule } from '@angular/common';
    
    @Component({
      selector: 'app-design1',
      imports: [CommonModule, ReactiveFormsModule],
      templateUrl: './design1.component.html',
      styleUrl: './design1.component.scss'
    })
    export class Design1Component implements OnInit {
      cancellationForm!: FormGroup;
      wordLimitExceeded = false;
    
      consignmentDataMap: any = {
        CN123: {
          consignerCode: 'C001',
          consignerId: 'CID001',
          consigneeCode: 'G001',
          consigneeId: 'GID001',
          serviceMode: 'Air',
        },
        CN456: {
          consignerCode: 'C002',
          consignerId: 'CID002',
          consigneeCode: 'G002',
          consigneeId: 'GID002',
          serviceMode: 'Surface',
        },
      };
    
      constructor(private fb: FormBuilder) {}
    
      ngOnInit(): void {
        const today = new Date().toISOString().substring(0, 10);
        this.cancellationForm = this.fb.group({
          stationFrom: [
            '',
            [
              Validators.required,
              Validators.maxLength(15),
              Validators.pattern('^[A-Z ]+$'),
            ],
          ],
          consignmentId: ['', Validators.required],
          date: [today, Validators.required],
          serviceMode: ['', Validators.required],
          consignerCode: ['', Validators.required],
          consignerId: ['', Validators.required],
          consigneeCode: ['', Validators.required],
          consigneeId: ['', Validators.required],
          paidBy: ['', Validators.required],
          paymentMode: ['', Validators.required],
          registrationAmount: ['', Validators.required],
          ownerChoice: ['', Validators.required],
          remarks: ['', [Validators.required, this.wordLimitValidator(70)]],
          cancellationRows: this.fb.array([], Validators.required),
        });
    
        this.addCancellationRow();
      }
    
      isFieldInvalid(field: string): boolean {
        const control = this.cancellationForm.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
      }
    
      onConsignmentIdChange(): void {
        const enteredId = this.cancellationForm.get('consignmentId')?.value;
        const data = this.consignmentDataMap[enteredId];
    
        if (data) {
          this.cancellationForm.patchValue({
            consignerCode: data.consignerCode,
            consignerId: data.consignerId,
            consigneeCode: data.consigneeCode,
            consigneeId: data.consigneeId,
            serviceMode: data.serviceMode,
          });
        } else {
          this.cancellationForm.patchValue({
            consignerCode: '',
            consignerId: '',
            consigneeCode: '',
            consigneeId: '',
            serviceMode: '',
          });
        }
      }
    
      get cancellationRows(): FormArray {
        return this.cancellationForm.get('cancellationRows') as FormArray;
      }
    
      addCancellationRow(): void {
        const row = this.fb.group({
          containerNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
          size: ['', Validators.required],
          type: ['', Validators.required],
          ownerType: ['', Validators.required],
        });
        this.cancellationRows.push(row);
      }
    
      checkWordLimit(): void {
        const text: string = this.cancellationForm.get('remarks')?.value || '';
        const wordCount = text.trim().split(/\s+/).length;
        this.wordLimitExceeded = wordCount > 70;
      }
    
      wordLimitValidator(maxWords: number) {
        return (control: FormControl) => {
          const value = control.value || '';
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount > maxWords ? { wordLimitExceeded: true } : null;
        };
      }
    
      onCancel(): void {
        if (this.wordLimitExceeded) {
          alert('Please limit remarks to 70 words.');
          return;
        }
    
        console.log('Form submitted:', this.cancellationForm.value);
        alert('Indent cancellation submitted!');
      }
    
      onSave(): void {
        if (this.cancellationForm.valid) {
          console.log('Form Submitted:', this.cancellationForm.value);
          alert('Form successfully saved and submitted!');
        } else {
          alert('Please fill out all required fields correctly.');
          this.cancellationForm.markAllAsTouched();
        }
      }
    
      onReset(): void {
        this.cancellationForm.reset();
        while (this.cancellationRows.length !== 0) {
          this.cancellationRows.removeAt(0);
        }
        this.addCancellationRow();
        this.wordLimitExceeded = false;
      }
    
      // ✅ Uppercase & no-number input for "Station From"
      onStationFromInput(event: any): void {
        const input = event.target.value.toUpperCase().replace(/[^A-Z ]/g, '');
        this.cancellationForm
          .get('stationFrom')
          ?.setValue(input, { emitEvent: false });
      }
    }
    