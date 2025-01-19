import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  subscriptions: Subscription[] = [];

  addRequest(sub: Subscription) {
    this.subscriptions.push(sub);
    this.printSubs();
  }

  cancelAllRequests() {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
    this.printSubs();
  }

  printSubs() {
    this.subscriptions.forEach((element) => {
      console.log(element.closed);
    });
  }
}
