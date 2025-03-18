import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { Model } from '../../types/model';
import { BackendResponse } from '../../types/response';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  public modelArray: Model[] = [];

  constructor(private http: HttpClient) {
    this.updateModelData();
  }

  updateModelData() {
    this.http.get<BackendResponse<Model[]>>(ENV.modelList.href).subscribe((value) => {
      this.modelArray = value.data || [];
    });
  }
}
