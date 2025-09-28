import { CommonModule } from '@angular/common';
import { Component, Input , OnChanges,SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-validation-popup',
  imports: [CommonModule],
  templateUrl: './validation-popup.component.html',
   //templateUrl: './validation-popup.component.html',
  styleUrls: ['./validation-popup.component.scss']
})
export class ValidationPopupComponent {
  @Input() fieldNames: string[] = [];
  @Input() filled: { [key: string]: boolean } = {};
  
  @Input() labels: { [key: string]: string } = {}; 

  visibleFields: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Whenever inputs change, refresh visibleFields
    if (changes['filled'] || changes['fieldNames']) {
      this.updateVisibleFields();
    }
  }

  updateVisibleFields() {
    this.fieldNames.forEach(field => {
      const isFilled = this.filled[field];

      if (!isFilled && !this.visibleFields.includes(field)) {
        // If empty and not visible yet, show
        this.visibleFields.push(field);
      }

      if (isFilled && !this.visibleFields.includes(field)) {
        // If just filled, add temporarily
        this.visibleFields.push(field);
        setTimeout(() => {
          this.visibleFields = this.visibleFields.filter(f => f !== field);
        }, 2000); // remove after 2 sec
      }
    });
  }

  formatFieldName(field: string): string {
  // Convert camelCase or PascalCase to "Camel Case"
  return this.labels?.[field] || field
    .replace(/([A-Z])/g, ' $1')       // add space before capital letters
    .replace(/[_\-]/g, ' ')           // replace underscores/dashes with space
    .replace(/\s+/g, ' ')             // collapse multiple spaces
    .replace(/^\w/, c => c.toUpperCase()); // capitalize first letter
}

}





