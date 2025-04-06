import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListItem } from './file-list-item';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FileData } from '../../../types/file';
import { signal } from '@angular/core';
import { FileUploaderService } from '../../services/file-uploader.service';

describe('FileListItem', () => {
  let component: FileListItem;
  let fixture: ComponentFixture<FileListItem>;

  let fileUploaderServiceMock: jest.Mocked<FileUploaderService>;

  beforeEach(async () => {
    fileUploaderServiceMock = {
      fileDataList: signal<FileData[]>([
        new FileData('1', 'file1', 'application/pdf', 100, null, false, 0),
        new FileData('2', 'file2', 'application/pdf', 100, null, false, 0)
      ])
    } as unknown as jest.Mocked<FileUploaderService>;

    await TestBed.configureTestingModule({
      imports: [FileListItem],
      providers: [
        { provide: FileUploaderService, useValue: fileUploaderServiceMock },
        provideHttpClient(withInterceptorsFromDi())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FileListItem);
    component = fixture.componentInstance;
    component.fileIndex = 0;

    fixture.detectChanges();
  });

  it('should return correct fileItem data', () => {
    const file = component.fileItem();
    expect(file.id).toBe('1');
    expect(file.filename).toBe('file1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event', () => {
    const onClickSpy = jest.fn();
    component.onClick.subscribe(onClickSpy);
    component.clickButton();
    expect(onClickSpy).toHaveBeenCalled();
  });
});
