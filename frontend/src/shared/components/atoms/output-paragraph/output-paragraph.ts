import { Component, Input } from '@angular/core';

@Component({
  selector: 'output-paragraph',
  standalone: true,
  imports: [],
  templateUrl: './output-paragraph.html',
  styleUrl: './output-paragraph.scss'
})
export class OutputParagraph {
  @Input() text: string = '';
}
