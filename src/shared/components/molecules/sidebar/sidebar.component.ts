import { Component, Input, signal } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SidebarStateService } from '../../services/sidebar-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private sidebarService: SidebarStateService) {}

  openOptions() {
    console.log(this.sidebarService.isOpen);
    this.sidebarService.toggleState();
  }
}
