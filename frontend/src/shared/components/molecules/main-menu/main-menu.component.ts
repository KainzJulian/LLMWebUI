import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { BaseButton } from '../../atoms/base-button/base-button';
import { FloatingPanel } from '../../atoms/floating-panel/floating-panel';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'main-menu',
  standalone: true,
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
  imports: [CommonModule, BaseButton, FloatingPanel, Icon]
})
export class MainMenuComponent {
  constructor(
    public stateService: SidebarStateService,
    public chatService: ChatService
  ) {}

  @ViewChild('floatingPanel', { read: ElementRef }) floatingPanel!: ElementRef;

  deleteAllChats() {
    this.chatService.deleteAll();
  }

  close(): void {
    this.stateService.setOptionsState(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.floatingPanel == undefined) return;

    if (this.stateService.isOptionsOpen()) {
      const target = event.target as HTMLElement;

      if (!this.floatingPanel.nativeElement.contains(target)) {
        this.stateService.setOptionsState(false);
      }
    }
  }
}
