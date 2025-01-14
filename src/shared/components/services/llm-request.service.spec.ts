import { TestBed } from '@angular/core/testing';

import { LlmRequestService } from './llm-request.service';

describe('LlmRequestService', () => {
  let service: LlmRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlmRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
