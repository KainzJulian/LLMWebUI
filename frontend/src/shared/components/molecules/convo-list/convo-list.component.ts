import { Component, Input } from '@angular/core';
import { OutputFieldComponent } from '../output-field/output-field.component';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convo-list',
  standalone: true,
  imports: [OutputFieldComponent, CommonModule],
  templateUrl: './convo-list.component.html',
  styleUrl: './convo-list.component.scss',
})
export class ConvoListComponent {
  constructor(public chatService: ChatService) {}
}
