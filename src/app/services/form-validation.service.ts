import { Injectable } from '@angular/core';
import { FormGroup,AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormValidationService {
  getInvalidFields(form: FormGroup): string[] {
    const invalidFields: string[] = [];
    Object.keys(form.controls).forEach(key => {
      if (form.get(key)?.invalid || !form.get(key)?.value) {
        invalidFields.push(key);
      }
    });
    return invalidFields;
  }

  markAllFieldsTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => control.markAsTouched());
  }

  getValidationClass(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);
    if (!control || !control.touched) return '';
    return control.valid ? '':'is-invalid';
  }

}

