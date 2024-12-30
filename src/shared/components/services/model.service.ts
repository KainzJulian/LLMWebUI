import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  public models: Model[];
  private modelListURL = ENV.modelList;

  constructor(private http: HttpClient) {
    this.models = [];
    console.log('test');

    this.testGet();
  }

  testGet() {
    return this.http.get<ModelArray>(this.modelListURL).subscribe((value) => {
      this.models = value.models;
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

export class ModelResponse {
  model: string;
  created_at: string;
  // messages: Message[];

  constructor(data: Partial<ModelResponse> = {}) {
    this.created_at = data.created_at || '';
    this.model = data.model || '';
    // this.messages = data.messages || [];
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
