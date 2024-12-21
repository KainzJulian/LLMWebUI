import { Component, Input, model, signal } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { Chat, ChatService } from '../../services/chat.service';
import { Model, ModelService } from '../../services/model.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    private sidebarService: SidebarStateService,
    public modelService: ModelService,
    public chatService: ChatService
  ) {}

  openOptions() {
    console.log(this.sidebarService.isOpen);
    this.sidebarService.toggleState();
  }
}
