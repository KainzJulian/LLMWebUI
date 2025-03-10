import { TestBed } from '@angular/core/testing';

import { LLMRequestService } from './llm-request.service';
import { ChatService } from './chat.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('LlmRequestService', () => {
  let service: LLMRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LLMRequestService, ChatService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(LLMRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
