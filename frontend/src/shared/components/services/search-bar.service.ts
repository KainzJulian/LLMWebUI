import { Injectable, signal } from '@angular/core';
import { SearchResult } from '../../types/searchResult';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private searchBarOpen = signal(false);
  public searchResults?: SearchResult[] = [];

  getSearchState() {
    return this.searchBarOpen();
  }

  switchSearchState() {
    this.searchBarOpen.update((val) => (val = !val));
  }

  setSearchState(state: boolean) {
    this.searchResults = [];
    this.searchBarOpen.set(state);
  }
}
