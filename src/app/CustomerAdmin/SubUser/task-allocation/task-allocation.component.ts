import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-allocation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.scss']
})
export class TaskAllocationComponent implements OnInit {

  form!: FormGroup;

  subIds = ['SUB001', 'SUB002', 'SUB003'];
  terminalCodes = ['T1', 'T2', 'T3'];
  customerCodes = ['CUSTA', 'CUSTB', 'CUSTC'];

  taskOptions = [
    { short: 'GI', full: 'Gate In' },
    { short: 'GO', full: 'Gate Out' },
    { short: 'JO', full: 'Job Order' },
    { short: 'ALT', full: 'Allotment' },
    { short: 'FN', full: 'Final' }
  ];

  // State
  submittedData: any[] = [];
  isSubIdActive: { [key: string]: boolean } = {};
  historicalData: { [key: string]: any[] } = {};
  showForm = false;
  showTaskPopup = false;
  selectedTasks: string[] = [];
  modifyingIndex: number | null = null;
  message: { text: string, type: 'success' | 'error' | '' } = { text: '', type: '' };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      subId: ['', Validators.required],
      terminalCode: ['', Validators.required],
      customerCode: ['', Validators.required],
      tasks: [[], Validators.required],
      description: ['', Validators.required]
    });

    // Default activation
    this.subIds.forEach(id => {
      this.isSubIdActive[id] = true;
      this.historicalData[id] = [];
    });
  }

  // --- SubID logic ---
  toggleActivation(subId: string) {
    if (!subId) return;
    this.isSubIdActive[subId] = !this.isSubIdActive[subId];
  }

  onSubIdChange() {
    const subId = this.form.get('subId')?.value;
    if (!subId) return;

    if (this.historicalData[subId]?.length > 0) {
      this.submittedData = [...this.historicalData[subId]];
      this.showForm = false;
    } else {
      this.submittedData = [];
      this.showForm = true;
    }
  }

  // --- Task popup logic ---
  openTaskPopup(index: number | null = null) {
    this.selectedTasks = index !== null ? [...this.submittedData[index].tasks] : [];
    this.modifyingIndex = index;
    this.showTaskPopup = true;
  }

  isTaskSelected(taskShort: string): boolean {
    return this.selectedTasks.includes(taskShort);
  }

  toggleTaskSelection(taskShort: string) {
    if (this.selectedTasks.includes(taskShort)) {
      this.selectedTasks = this.selectedTasks.filter(t => t !== taskShort);
    } else {
      this.selectedTasks.push(taskShort);
    }
  }

  confirmTasks() {
    const description = this.selectedTasks
      .map(short => this.taskOptions.find(t => t.short === short)?.full || '')
      .join(', ');

    if (this.modifyingIndex !== null) {
      const row = this.submittedData[this.modifyingIndex];
      row.tasks = [...this.selectedTasks];
      row.description = description;
      this.modifyingIndex = null;
    } else {
      this.form.patchValue({ tasks: this.selectedTasks, description });
    }

    this.showTaskPopup = false;
  }

  // --- Table actions ---
  addRow() {
    this.message = { text: '', type: '' };

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.message = { text: 'All fields are mandatory', type: 'error' };
      return;
    }

    const subId = this.form.value.subId;
    const duplicate = this.submittedData.some(row =>
      row.subId === subId &&
      row.terminalCode === this.form.value.terminalCode &&
      row.customerCode === this.form.value.customerCode
    );

    if (duplicate) {
      this.message = { text: 'This combination already exists', type: 'error' };
      return;
    }

    this.submittedData.push({ ...this.form.value });
    this.message = { text: 'Task assigned successfully', type: 'success' };

    this.form.patchValue({ terminalCode: '', customerCode: '', tasks: [], description: '' });
    this.showForm = false;

    this.historicalData[subId] = [...this.submittedData];
  }

  deleteRow(index: number) {
    this.submittedData.splice(index, 1);
    this.message = { text: 'Task deleted successfully.', type: 'success' };
  }

  showFormView() {
    this.showForm = true;
  }

  // --- Final submit ---
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const finalPayload = {
      SRVC: 'CTGATEEMPT',
      ...this.form.value
    };

    console.log('📦 Final Payload:', finalPayload);
    alert('Form Submitted. Check console log.');
  }
}
