import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarStateService {
  public isSidebarOpen = signal(true);
  public isOptionsOpen = signal(false);

  toggleState() {
    this.isOptionsOpen.update((current) => !current);
  }

  setState(state: boolean) {
    this.isOptionsOpen.set(state);
  }
}
