import { Component, Input, OnInit } from '@angular/core';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { Marked } from 'marked';

import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

@Component({
  selector: 'code-paragraph',
  standalone: true,
  imports: [BaseButton, Icon],
  templateUrl: './code-paragraph.html',
  styleUrl: './code-paragraph.scss'
})
export class CodeParagraph implements OnInit {
  @Input() title: string = '';
  @Input() code: string = '';

  copyCode(text: string) {
    console.log('Text', text);

    navigator.clipboard.writeText(text);
  }

  ngOnInit(): void {
    const marked = new Marked(
      markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',

        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );

    this.title = this.extractLanguage(this.code);

    this.code = marked.parse(this.code).toString();
    console.log(this.code);
  }

  extractLanguage(code: string): string {
    const langMatch = code.match(/```(\w+)/);

    if (langMatch == null) return 'plaintext';

    return langMatch[1];
  }
}
