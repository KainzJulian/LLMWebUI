import { Component, Input } from '@angular/core';
import { OutputFieldComponent } from '../../atoms/output-field/output-field.component';
import { ConvoList } from '../../services/convo.service';

@Component({
  selector: 'app-convo-list',
  standalone: true,
  imports: [OutputFieldComponent],
  templateUrl: './convo-list.component.html',
  styleUrl: './convo-list.component.scss',
})
export class ConvoListComponent {
  @Input() convoList!: ConvoList;
}
