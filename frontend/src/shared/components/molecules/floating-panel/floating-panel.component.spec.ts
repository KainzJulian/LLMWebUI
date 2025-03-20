import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingPanelComponent } from './floating-panel.component';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ChatService } from '../../services/chat.service';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FloatingPanelComponent', () => {
  let component: FloatingPanelComponent;
  let fixture: ComponentFixture<FloatingPanelComponent>;

  let sidebarStateMock: jest.Mocked<SidebarStateService>;
  let chatMock: jest.Mocked<ChatService>;

  beforeEach(async () => {
    sidebarStateMock = {
      isOptionsOpen: jest.fn().mockReturnValue(false),
      isSidebarOpen: jest.fn().mockReturnValue(false),
      toggleOptionsState: jest.fn(),
      toggleSidebarState: jest.fn(),
      setOptionsState: jest.fn(),
      setSidebarState: jest.fn()
    } as unknown as jest.Mocked<SidebarStateService>;

    chatMock = {
      deleteAll: jest.fn()
    } as unknown as jest.Mocked<ChatService>;

    await TestBed.configureTestingModule({
      imports: [FloatingPanelComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SidebarStateService, useValue: sidebarStateMock },
        { provide: ChatService, useValue: chatMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingPanelComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the floating panel', () => {
    component.close();
    expect(component.stateService.isOptionsOpen()).toBe(false);
  });

  it('should not render when the floating panel is closed', () => {
    sidebarStateMock.isOptionsOpen.mockReturnValue(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.container')).toBeNull();
  });

  it('should call close() when close button is clicked', () => {
    sidebarStateMock.isOptionsOpen.mockReturnValue(true);
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.button--close'));

    expect(closeButton).toBeTruthy();

    jest.spyOn(component, 'close');

    closeButton.triggerEventHandler('onClick', null);

    expect(component.close).toHaveBeenCalled();
    expect(component.stateService.setOptionsState).toHaveBeenCalledWith(false);
  });
});
