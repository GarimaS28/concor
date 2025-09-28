import { Component } from '@angular/core';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// third party import
import { ColorPickerModule } from 'ngx-color-picker';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  
  imports: [SharedModule, NgbDropdownModule, ColorPickerModule,RouterLink],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent { 

}
