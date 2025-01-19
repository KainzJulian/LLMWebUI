import { HttpClient } from '@angular/common/http';
import { Injectable, model, OnInit, Signal, signal } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { map, Subscription } from 'rxjs';
import { ChatService } from './chat.service';
import { Convo, ConvoResponse } from './convo.service';
import { LLMRequestService } from './llm-request.service';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  public modelArray = signal(new ModelArray());

  constructor(private http: HttpClient) {
    console.log('test');
    this.updateModelData();
  }

  updateModelData() {
    this.http.get<ModelArray>(ENV.modelList).subscribe((value) => {
      this.modelArray?.set(value);
    });
  }
}

export class ModelArray {
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
