import { Component, Input, signal } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ChatList, chatListBuilder } from '../../interfaces/chat';
import { ModelList, modelListBuilder } from '../../interfaces/model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  chatList: ChatList = chatListBuilder();
  modelList: ModelList = modelListBuilder();

  constructor(private sidebarService: SidebarStateService) {}

  openOptions() {
    console.log(this.sidebarService.isOpen);
    this.sidebarService.toggleState();
  }
}
