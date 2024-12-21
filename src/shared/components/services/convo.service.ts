import { Injectable } from '@angular/core';
import { randomText } from '../../../app/tools';

@Injectable({
  providedIn: 'root',
})
export class ConvoService {
  public convo: Convo[];

  constructor() {
    this.convo = [];
  }

  buildConvo(length: number): Convo[] {
    let help = [];

    for (let i = 0; i < length; i++) {
      help.push(new Convo(i % 2 == 1, randomText(200)));
    }
    return help;
  }
}

export class Convo {
  constructor(public isAI: boolean, public text: string) {}
}
