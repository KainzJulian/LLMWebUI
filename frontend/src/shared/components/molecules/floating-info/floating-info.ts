import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../../atoms/icon/icon';
import { BaseButton } from '../../atoms/base-button/base-button';
import { FloatingInfoService } from '../../services/floating-info.service';

@Component({
  selector: 'floating-info',
  standalone: true,
  imports: [CommonModule, Icon, BaseButton],
  templateUrl: './floating-info.html',
  styleUrl: './floating-info.scss'
})
export class FloatingInfo {
  constructor(public floatingInfoService: FloatingInfoService) {}

  close() {
    this.floatingInfoService.hide();
  }
}
