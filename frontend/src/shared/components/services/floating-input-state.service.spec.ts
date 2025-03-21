import { TestBed } from '@angular/core/testing';

import { FloatingInputStateService } from './floating-input-state.service';

describe('FloatingInputStateService', () => {
  let service: FloatingInputStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingInputStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
