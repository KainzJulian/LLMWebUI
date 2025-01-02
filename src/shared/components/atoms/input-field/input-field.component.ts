import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, model, ViewChild } from '@angular/core';
import { ENV } from '../../../../environments/environment';
import { ChatService } from '../../services/chat.service';
import { Convo, ConvoResponse } from '../../services/convo.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  inputText: string = '';
  @ViewChild('input') input!: ElementRef;

  constructor(
    private http: HttpClient,
    public chatService: ChatService,
    public modelService: ModelService
  ) {}

  changePosition() {
    // this.input.nativeElement.style.backgroundColor = 'red';
  }

  clearInput() {
    this.input.nativeElement.value = '';
  }
}
