import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploader } from './file-uploader';
import { FileUploaderService } from '../../services/file-uploader.service';
import { FileData } from '../../../types/file';
import { signal } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FileUploader', () => {
  let component: FileUploader;
  let fixture: ComponentFixture<FileUploader>;

  let fileUploaderServiceMock: jest.Mocked<FileUploaderService>;

  beforeEach(async () => {
    fileUploaderServiceMock = {
      fileDataList: signal<FileData[]>([
        new FileData('1', 'file1', 'application/pdf', 100, null, false, 0),
        new FileData('2', 'file2', 'application/pdf', 100, null, false, 0)
      ]),
      getOpenState: jest.fn().mockReturnValue(true),
      deleteFile: jest.fn().mockImplementation((index: number) => {
        component.fileUploaderService.fileDataList().splice(index, 1);
      })
    } as unknown as jest.Mocked<FileUploaderService>;

    await TestBed.configureTestingModule({
      imports: [FileUploader],
      providers: [
        { provide: FileUploaderService, useValue: fileUploaderServiceMock },
        provideHttpClient(withInterceptorsFromDi())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deleteFile correctly', () => {
    component.deleteFile(0);
    expect(component.fileUploaderService.fileDataList().length).toBe(1);
  });
});
