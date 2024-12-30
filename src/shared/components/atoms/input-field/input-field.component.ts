import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, model, ViewChild } from '@angular/core';
import { ENV } from '../../../../environments/environment';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  inputText: string = '';
  @ViewChild('input') input!: ElementRef;

  constructor(private http: HttpClient, private chatService: ChatService) {}

  sendRequest(text: string) {
    console.log(text);

    // tinyllama:latest schreibt lange response deshalb sollte mit anderen models später getestet werden
    this.http
      .post(
        ENV.generateURL,
        '{"model": "tinyllama:latest", "prompt":"How are you?", "stream": false}'
      )
      .subscribe((value) => {
        console.log(value);
      });
  }

  getResponse(text: string) {
    // return this.http
    //   .post<ModelResponse>(
    //     ENV.generateURL,
    //     `{
    //     "model": ${this.chatService.currentChat.name}
    //     "prompt": ${text},
    //     "stream": true,
    //   } `
    //   )
    //   .subscribe((value) => {
    //     console.log(value);
    //   });
  }

  changePosition() {
    // this.input.nativeElement.style.backgroundColor = 'red';
  }
}
