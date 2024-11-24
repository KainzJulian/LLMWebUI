import { Component } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { OutputFieldComponent } from '../../atoms/output-field/output-field.component';

@Component({
  selector: 'app-wep-page',
  standalone: true,
  imports: [OutputFieldComponent],
  templateUrl: './wep-page.component.html',
  styleUrl: './wep-page.component.scss',
})
export class WepPageComponent {}
