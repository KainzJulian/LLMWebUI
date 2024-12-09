import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-floating-panel',
  standalone: true,
  templateUrl: './floating-panel.component.html',
  styleUrl: './floating-panel.component.scss',
})
export class FloatingPanelComponent {
  constructor(public stateService: SidebarStateService) {}

  close(): void {
    this.stateService.setState(false);
  }
}
