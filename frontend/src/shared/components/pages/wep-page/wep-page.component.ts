import { Component } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { OutputFieldComponent } from '../../molecules/output-field/output-field.component';
import { ConvoListComponent } from '../../molecules/convo-list/convo-list.component';
import { SidebarComponent } from '../../molecules/sidebar/sidebar.component';
import { FloatingPanelComponent } from '../../atoms/floating-panel/floating-panel.component';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FloatingButton } from '../../atoms/floating-button/floating-button';
import { BaseButton } from '../../atoms/base-button/base-button';

@Component({
  selector: 'app-wep-page',
  standalone: true,
  imports: [
    ConvoListComponent,
    InputFieldComponent,
    SidebarComponent,
    FloatingPanelComponent,
    CommonModule,
    FloatingButton,
  ],
  templateUrl: './wep-page.component.html',
  styleUrl: './wep-page.component.scss',
})
export class WepPageComponent {
  constructor(public chatService: ChatService) {}
}
