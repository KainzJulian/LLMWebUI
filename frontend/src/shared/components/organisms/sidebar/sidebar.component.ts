import { Component } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { BaseButton } from '../../atoms/base-button/base-button';
import { ListButton } from '../../molecules/list-button/list-button';
import { Icon } from '../../atoms/icon/icon';
import { LLMRequestService } from '../../services/llm-request.service';
import { FloatingInputStateService } from '../../services/floating-input-state.service';
import { Chat } from '../../../types/chat';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, BaseButton, ListButton, Icon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(
    public sidebarService: SidebarStateService,
    public modelService: ModelService,
    public chatService: ChatService,
    public llmService: LLMRequestService,
    public floatingInputService: FloatingInputStateService
  ) {}

  openSearch() {
    throw new Error('Method not implemented.');
  }

  openSidebar() {
    this.sidebarService.isSidebarOpen.set(true);
  }

  closeSidebar() {
    this.sidebarService.isSidebarOpen.set(false);
  }

  openOptions() {
    this.sidebarService.toggleOptionsState();
  }

  createImage() {
    this.llmService.generateImage();
  }

  openRenamePanel(chat: Chat) {
    this.floatingInputService.setChat(chat);
    this.floatingInputService.setFloatingInputState(true);
  }
}
