import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { Model, ModelArray } from '../../types/model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  public modelArray: Model[] = [];

  constructor(private http: HttpClient) {
    console.log('test');
    this.updateModelData();
  }

  updateModelData() {
    this.http.get<Model[]>(ENV.modelList.href).subscribe((value) => {
      this.modelArray = value;
      console.log(value);
      console.log(this.modelArray);
    });
  }
}
