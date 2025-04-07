import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FloatingInfoService {
  visible = signal(false);
  text = signal('');
  duration = signal(0);

  timeout = setTimeout(() => {}, 0);

  hide() {
    this.visible.set(false);
  }

  show(text: string, durationInMS: number) {
    this.text.set(text);
    this.duration.set(durationInMS);
    this.visible.set(true);

    if (this.timeout != null) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.hide();
    }, durationInMS);
  }
}
