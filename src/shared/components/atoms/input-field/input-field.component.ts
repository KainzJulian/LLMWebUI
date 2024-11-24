import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @ViewChild('input') input!: ElementRef;
  inputText: string = '';

  changePosition() {
    // this.input.nativeElement.style.backgroundColor = 'red';
  }
}
