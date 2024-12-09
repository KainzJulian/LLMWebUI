import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarStateService {
  isOpen = signal(false);

  toggleState() {
    this.isOpen.update((current) => !current);
  }

  setState(state: boolean) {
    this.isOpen.set(state);
  }
}
