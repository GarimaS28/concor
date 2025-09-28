import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FAQComponent {

  isCollapsed = true;
  isMultiCollapsed1 = true;
  isMultiCollapsed2 = true;

  items = ['First', 'Second', 'Third'];

}


