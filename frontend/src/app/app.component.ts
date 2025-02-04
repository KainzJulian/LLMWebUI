import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WepPageComponent } from '../shared/components/pages/wep-page/wep-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WepPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'LLMWebUI';
}
