import { TestBed } from '@angular/core/testing';

import { FloatingInfoService } from './floating-info.service';

describe('FloatingInfoService', () => {
  let service: FloatingInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
