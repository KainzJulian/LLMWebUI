import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebPageComponent } from '../shared/components/pages/web-page/web-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WebPageComponent],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LLMWebUI';
}
