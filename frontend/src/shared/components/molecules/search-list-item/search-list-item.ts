import { Component, Input } from '@angular/core';
import { SearchResult } from '../../../types/searchResult';
import { BaseButton } from '../../atoms/base-button/base-button';
import { ChatService } from '../../services/chat.service';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'search-list-item',
  standalone: true,
  imports: [BaseButton],
  templateUrl: './search-list-item.html',
  styleUrl: './search-list-item.scss'
})
export class SearchListItem {
  @Input() data?: SearchResult;

  constructor(
    private chatService: ChatService,
    private searchService: SearchBarService
  ) {}

  openChat() {
    const chat = this.chatService.chatList.find((val) => val.id == this.data?.id);

    if (chat == undefined) return;

    this.chatService.setCurrentChat(chat);

    this.searchService.setSearchState(false);
  }
}
