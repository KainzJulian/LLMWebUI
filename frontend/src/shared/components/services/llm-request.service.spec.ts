import { TestBed } from '@angular/core/testing';

import { LLMRequestService } from './llm-request.service';

describe('LlmRequestService', () => {
  let service: LLMRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LLMRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
