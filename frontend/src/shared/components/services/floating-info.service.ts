import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FloatingInfoService {
  visible = signal(false);
  text = signal('');
  duration = signal(0);

  hide() {
    this.visible.set(false);
  }

  show(text: string, durationInMS: number) {
    this.text.set(text);
    this.duration.set(durationInMS);
    this.visible.set(true);

    setTimeout(() => {
      this.hide();
    }, durationInMS);
  }
}
