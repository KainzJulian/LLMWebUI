import { Component } from '@angular/core';
import { FloatingPanel } from '../../atoms/floating-panel/floating-panel';
import { SearchBarService } from '../../services/search-bar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../../../environments/environment';
import { BackendResponse } from '../../../types/response';
import { SearchResult } from '../../../types/searchResult';
import { SearchListItem } from '../search-list-item/search-list-item';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { FloatingInfoService } from '../../services/floating-info.service';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FloatingPanel, CommonModule, FormsModule, SearchListItem, BaseButton, Icon],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  public input: string = '';

  constructor(
    public searchService: SearchBarService,
    public http: HttpClient,
    private floatingInfoService: FloatingInfoService
  ) {}

  public searchChat() {
    this.http
      .get<BackendResponse<SearchResult[]>>(ENV.chatURL.href + '/search/' + this.input)
      .subscribe((res) => {
        console.log(res.data);

        if (res.data == null || res.data?.length == 0) {
          this.floatingInfoService.show(
            'No results found for "<strong>' + this.input + '</strong>"',
            5000
          );

          return;
        }

        this.searchService.searchResults = res.data;
      });
  }
}
