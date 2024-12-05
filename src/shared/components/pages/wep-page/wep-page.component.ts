import { Component } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { OutputFieldComponent } from '../../atoms/output-field/output-field.component';
import { ConvoListComponent } from '../../molecules/convo-list/convo-list.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SidebarComponent } from '../../molecules/sidebar/sidebar.component';

@Component({
  selector: 'app-wep-page',
  standalone: true,
  imports: [
    ConvoListComponent,
    InputFieldComponent,
    ButtonComponent,
    SidebarComponent,
  ],
  templateUrl: './wep-page.component.html',
  styleUrl: './wep-page.component.scss',
})
export class WepPageComponent {}
