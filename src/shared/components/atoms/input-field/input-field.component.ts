import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, model, ViewChild } from '@angular/core';
import { ENV } from '../../../../environments/environment';
import { ChatService } from '../../services/chat.service';
import { Convo, ConvoResponse } from '../../services/convo.service';

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
    this.clearInput();

    console.log(text);
    const model = this.chatService.currentChat.modelName;

    this.chatService.currentChat.addNewConvo(
      new Convo({ role: 'user', content: text })
    );

    console.log(
      `{"model": "${model}", "messages": ${JSON.stringify(
        this.chatService.currentChat.convo
      )}, "stream": false}`
    );

    this.http
      .post<ConvoResponse>(
        ENV.generateURL,
        `{"model": "${model}", "messages": ${JSON.stringify(
          this.chatService.currentChat.convo
        )}, "stream": false}`
      )
      .subscribe((value) => {
        console.log(value);

        this.chatService.currentChat.addNewConvo(new Convo(value.message));
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
  clearInput() {
    this.input.nativeElement.value = '';
  }
}
