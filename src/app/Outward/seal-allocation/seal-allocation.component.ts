import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../theme/shared/shared.module';

@Component({  selector: 'app-seal-allocation',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './seal-allocation.component.html',
  styleUrl: './seal-allocation.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class SealAllocationComponent {


}

