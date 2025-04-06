import { TestBed } from '@angular/core/testing';

import { FileUploaderService } from './file-uploader.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FileUploaderService', () => {
  let service: FileUploaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi())]
    });
    service = TestBed.inject(FileUploaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
