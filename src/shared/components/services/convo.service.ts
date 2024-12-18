import { Injectable } from '@angular/core';
import { randomText } from '../../../app/tools';

@Injectable({
  providedIn: 'root',
})
export class ConvoService {
  convoListBuilder(): ConvoList {
    return new ConvoList([
      new Convo(false, randomText(400)),
      new Convo(true, randomText(400)),
      new Convo(false, randomText(400)),
      new Convo(true, randomText(400)),
      new Convo(false, randomText(400)),
      new Convo(true, randomText(400)),
      new Convo(false, randomText(400)),
      new Convo(true, randomText(400)),
      new Convo(false, randomText(400)),
      new Convo(true, randomText(400)),
      new Convo(false, randomText(400)),
      new Convo(true, randomText(400)),
    ]);
  }
}

export class ConvoList {
  constructor(public convo: Convo[]) {}
}

export class Convo {
  constructor(public isAI: boolean, public text: string) {}
}
