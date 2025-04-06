import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMenu } from './chat-menu';
import { CommonModule } from '@angular/common';
import { Icon } from '../../atoms/icon/icon';

describe('ChatMenu', () => {
  let component: ChatMenu;
  let fixture: ComponentFixture<ChatMenu>;
  let chatMenuMock: jest.Mocked<ChatMenu>;

  beforeEach(async () => {
    chatMenuMock = {
      onDelete: jest.fn(),
      onRename: jest.fn(),
      onArchive: jest.fn()
    } as unknown as jest.Mocked<ChatMenu>;

    await TestBed.configureTestingModule({
      imports: [ChatMenu, Icon, CommonModule],
      providers: [{ provide: ChatMenu, useValue: chatMenuMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onDelete event', () => {
    const onDeleteSpy = jest.fn();
    component.delete.subscribe(onDeleteSpy);
    component.delete.emit();
    expect(onDeleteSpy).toHaveBeenCalled();
  });

  it('should emit onRename event', () => {
    const onRenameSpy = jest.fn();
    component.rename.subscribe(onRenameSpy);
    component.rename.emit();
    expect(onRenameSpy).toHaveBeenCalled();
  });

  it('should emit onArchive event', () => {
    const onArchiveSpy = jest.fn();
    component.archive.subscribe(onArchiveSpy);
    component.archive.emit();
    expect(onArchiveSpy).toHaveBeenCalled();
  });

  it('should emit onDownload event', () => {
    const onDownloadSpy = jest.fn();
    component.download.subscribe(onDownloadSpy);
    component.download.emit();
    expect(onDownloadSpy).toHaveBeenCalled();
  });
});
