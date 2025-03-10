import { Component } from '@angular/core';
import { InputFieldComponent } from '../../molecules/input-field/input-field.component';
import { ConvoListComponent } from '../../molecules/convo-list/convo-list.component';
import { SidebarComponent } from '../../organisms/sidebar/sidebar.component';
import { FloatingPanelComponent } from '../../molecules/floating-panel/floating-panel.component';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FloatingButton } from '../../molecules/floating-button/floating-button';

@Component({
  selector: 'app-web-page',
  standalone: true,
  imports: [
    ConvoListComponent,
    InputFieldComponent,
    SidebarComponent,
    FloatingPanelComponent,
    CommonModule,
    FloatingButton
  ],
  templateUrl: './web-page.component.html',
  styleUrl: './web-page.component.scss'
})
export class WebPageComponent {
  constructor(public chatService: ChatService) {}
}
