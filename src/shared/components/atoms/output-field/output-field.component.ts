import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output-field',
  standalone: true,
  imports: [],
  templateUrl: './output-field.component.html',
  styleUrl: './output-field.component.scss',
})
export class OutputFieldComponent {
  @Input() text: string = '';
  @Input() textStyle: 'humanText' | 'aiText' = 'aiText';
}
