import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-seal-cutting',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './seal-cutting.component.html',
  styleUrls: ['./seal-cutting.component.scss'],
})
export class SealCuttingComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      JBODSttnFrm: [''],
      JBODeffDT: [''],
      JBODTrlrOwnr: ['C'],
      JBODCtnrOwnr: [false],
      JBODCustType: ['T'],
      containerDetails: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Hardcoded container details
    const sampleData = [
      { ContainerNo: 'ABC1234567', ContainerType: '20FT', isSelected: true },
      { ContainerNo: 'XYZ7654321', ContainerType: '40FT', isSelected: false },
      { ContainerNo: 'LMN9988776', ContainerType: '20FT', isSelected: true },
    ];

    sampleData.forEach(item => {
      this.containerDetails.push(this.createContainerDetailFormGroup(item));
    });
  }

  get containerDetails(): FormArray {
    return this.form.get('containerDetails') as FormArray;
  }

  createContainerDetailFormGroup(data?: any): FormGroup {
    return this.fb.group({
      ContainerNo: [data?.ContainerNo || ''],
      ContainerType: [data?.ContainerType || ''],
      isSelected: [data?.isSelected || false],
    });
  }

  onSubmit() {
    console.log('📦 Submitted Form:', this.form.value);
    alert('Form submitted! Check console.');
  }
}
