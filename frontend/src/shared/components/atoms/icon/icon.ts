import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon, base-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class Icon {
  @Input() iconName!: string;
}
