import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  public models: Model[];

  constructor() {
    this.models = [];

    this.models.push(new Model('test'));
    this.models.push(new Model('test1'));
    this.models.push(new Model('test2'));
    this.models.push(new Model('test3'));
    this.models.push(new Model('test4'));
    this.models.push(new Model('test5'));
  }
}

export class Model {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
