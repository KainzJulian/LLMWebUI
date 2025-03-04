import { Component, Input, model, signal } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { BaseButton } from '../../atoms/base-button/base-button';
import { ListButton } from '../../molecules/list-button/list-button';
import { Icon } from '../../atoms/icon/icon';

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
    public chatService: ChatService
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
    console.log(this.sidebarService.isOptionsOpen);
    this.sidebarService.toggleState();
  }

  deleteChat(): void {
    console.log('deleteChat');
  }

  createChat(): void {
    console.log('createChat');
  }

  openChat(): void {
    console.log('openChat');
  }
}
