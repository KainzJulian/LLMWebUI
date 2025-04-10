import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { LLMRequestService } from '../../services/llm-request.service';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { LoadingStateService } from '../../services/loading-state.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CodeParagraph } from '../code-paragraph/code-paragraph';
import { OutputParagraph } from '../../atoms/output-paragraph/output-paragraph';

@Component({
  selector: 'app-output-field',
  standalone: true,
  imports: [CommonModule, BaseButton, Icon],
  templateUrl: './output-field.component.html',
  styleUrl: './output-field.component.scss'
})
export class OutputFieldComponent {
  @Input() text: string = '';
  @Input() textStyle: 'text--user' | 'text--ai' = 'text--ai';

  @Input() isLastElement: boolean = false;

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  isCode = false;
  lastIndex = 0;

  ngOnInit() {
    this.getPreparedText();
  }

  constructor(
    public chatService: ChatService,
    private llmService: LLMRequestService,
    public loadingState: LoadingStateService,
    private sanitizer: DomSanitizer
  ) {}

  public copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  regenerateResponse() {
    if (this.chatService.currentChat == null) return;

    const size = this.chatService.currentChat.convo.length;
    const convo = this.chatService.currentChat.convo[size - 2];

    this.chatService.currentChat.convo.pop();
    this.chatService.currentChat.convo.pop();

    this.llmService.sendRequest(this.chatService.currentChat, convo?.content);
  }

  isAiText(): boolean {
    return this.textStyle == 'text--ai';
  }

  getCode(text: string, index: number): string {
    const start = index + 1;

    const lines = text.split('\n');

    let lineBuffer = lines[index] + '\n';

    console.log(text);

    for (let i = start; i < lines.length; i++) {
      lineBuffer += lines[i] + '\n';

      if (lines[i].match(/```/)) {
        this.lastIndex = i;
        return lineBuffer;
      }
    }

    return '';
  }

  getPreparedText() {
    const lines = this.text.split('\n');
    let isCode = false;

    let codeBuffer = '';

    for (let i = 0; i < lines.length; i++) {
      const element = lines[i];

      if (element.match(/```/)) {
        isCode = !isCode;
      }

      if (isCode) {
        codeBuffer = '';

        for (let j = i; j < lines.length; j++) {
          const line = lines[j];

          codeBuffer += lines[j] + '\n';

          if (line.match(/```/) && j != i) {
            i = j + 1;
            break;
          }
        }

        isCode = false;

        const codeParagraph = this.container.createComponent(CodeParagraph);
        codeParagraph.setInput('code', codeBuffer);
      } else {
        const paragraph = this.container.createComponent(OutputParagraph);
        paragraph.setInput('text', element);
      }
    }
  }
}
