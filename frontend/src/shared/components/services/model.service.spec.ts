import { TestBed } from '@angular/core/testing';

import { ModelService } from './model.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ModelService', () => {
  let service: ModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelService, provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    service = TestBed.inject(ModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
