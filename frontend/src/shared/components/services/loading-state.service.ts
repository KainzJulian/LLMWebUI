import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {
  public isLoading = signal(false);

  public set(state: boolean) {
    this.isLoading.set(state);
  }

  public switchLoadingState() {
    this.isLoading.update((current) => !current);
  }
}
