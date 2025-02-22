import { Injectable } from '@angular/core';
import { randomText } from '../../../app/tools';
import { Convo } from '../../types/convo';

//TODO: alle objecte von frontend in backend übertragen und einsetzen
@Injectable({
  providedIn: 'any'
})
export class ConvoService {
  public convo: Convo[];

  constructor() {
    this.convo = [];
  }

  buildConvo(length: number): Convo[] {
    let help = [];

    for (let i = 0; i < length; i++) {
      help.push(
        new Convo({
          role: i % 2 == 1 ? 'assistant' : 'user',
          content: randomText(200)
        })
      );
    }
    return help;
  }
}
