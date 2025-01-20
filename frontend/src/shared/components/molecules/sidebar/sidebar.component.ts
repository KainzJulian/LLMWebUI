import { Component, Input, model, signal } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    private sidebarService: SidebarStateService,
    public modelService: ModelService,
    public chatService: ChatService
  ) {}

  openSearch() {
    throw new Error('Method not implemented.');
  }

  closeSidebar() {
    throw new Error('Method not implemented.');
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
