import { TestBed } from '@angular/core/testing';

import { SearchBarService } from './search-bar.service';

describe('SearchStateService', () => {
  let service: SearchBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
