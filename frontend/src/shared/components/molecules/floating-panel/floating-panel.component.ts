import { Component } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { BaseButton } from '../../atoms/base-button/base-button';

//TODO: make the floating panel more reusable

@Component({
  selector: 'app-floating-panel',
  standalone: true,
  templateUrl: './floating-panel.component.html',
  styleUrl: './floating-panel.component.scss',
  imports: [CommonModule, BaseButton]
})
export class FloatingPanelComponent {
  constructor(
    public stateService: SidebarStateService,
    public chatService: ChatService
  ) {}

  archiveAllChats() {
    throw new Error('Method not implemented.');
  }

  deleteAllChats() {
    this.chatService.deleteAll();
  }

  close(): void {
    this.stateService.setOptionsState(false);
  }
}
