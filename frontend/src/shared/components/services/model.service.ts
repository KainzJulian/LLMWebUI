import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { ModelArray } from '../../types/model';

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
      console.log(this.modelArray());
    });
  }
}
