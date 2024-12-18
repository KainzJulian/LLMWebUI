import { Component, Input, signal } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ModelList, modelListBuilder } from '../../interfaces/model';
import { ChatList, ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() chatList!: ChatList;
  modelList: ModelList = modelListBuilder();

  constructor(private sidebarService: SidebarStateService) {}

  openOptions() {
    console.log(this.sidebarService.isOpen);
    this.sidebarService.toggleState();
  }
}
