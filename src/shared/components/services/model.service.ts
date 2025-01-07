import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { map } from 'rxjs';
import { ChatService } from './chat.service';
import { Convo, ConvoResponse } from './convo.service';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  public models: Model[] = [];
  private modelListURL = ENV.modelList;

  constructor(private http: HttpClient, public chatService: ChatService) {
    console.log('test');

    this.getModelData();
  }

  getModelData() {
    return this.http.get<ModelArray>(this.modelListURL).subscribe((value) => {
      this.models = value.models;
    });
  }

  sendRequest(text: string = '', hasSessionMemory: boolean = true) {
    if (this.chatService.currentChat == undefined) return;

    console.log(text);
    const model = this.chatService.currentChat.modelName;

    const newConvo = new Convo({ role: 'user', content: text });
    this.chatService.currentChat.addNewConvo(newConvo);

    let convo: Convo[] = [];

    if (hasSessionMemory) convo = this.chatService.currentChat.convo;
    else convo.push(newConvo);

    console.log(
      `{"model": "${model}", "messages": ${JSON.stringify(
        convo
      )}, "stream": false}`
    );

    this.http
      .post<ConvoResponse>(
        ENV.generateURL,
        `{"model": "${model}", "messages": ${JSON.stringify(
          convo
        )}, "stream": false}`
      )
      .subscribe((value) => {
        console.log(value);

        this.chatService.currentChat?.addNewConvo(new Convo(value.message));
      });
  }
}

class ModelArray {
  models: Model[];

  constructor(data: Partial<ModelArray> = {}) {
    this.models = data.models || [];
  }
}

export class Model {
  name: string;
  modified_at: string;
  size: string;
  digest: string;
  details: ModelDetails;

  constructor(data: Partial<Model> = {}) {
    this.name = data.name || '';
    this.modified_at = data.modified_at || '';
    this.size = data.size || '';
    this.digest = data.digest || '';
    this.details = new ModelDetails(data.details);
  }
}

export class ModelDetails {
  format: string;
  family: string;
  families: string | null;
  parameter_size: string;
  quantization_level: string;

  constructor(data: Partial<ModelDetails> = {}) {
    this.format = data.format || '';
    this.family = data.family || '';
    this.families = data.families || null;
    this.parameter_size = data.parameter_size || '';
    this.quantization_level = data.quantization_level || '';
  }
}

export class Message {
  role: string;
  content: string;

  constructor(data: Partial<Message>) {
    this.role = data.role || '';
    this.content = data.content || '';
  }
}
