import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  public isSidebarOpen = signal(true);
  public isOptionsOpen = signal(false);

  toggleOptionsState() {
    this.isOptionsOpen.update((current) => !current);
  }

  toggleSidebarState() {
    this.isSidebarOpen.update((current) => !current);
  }

  setOptionsState(state: boolean) {
    this.isOptionsOpen.set(state);
  }

  setSidebarState(state: boolean) {
    this.isSidebarOpen.set(state);
  }
}
