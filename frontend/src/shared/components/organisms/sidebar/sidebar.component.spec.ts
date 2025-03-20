import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChatService } from '../../services/chat.service';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { ModelService } from '../../services/model.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        SidebarStateService,
        ChatService,
        ModelService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the sidebar', () => {
    component.openSidebar();
    expect(component.sidebarService.isSidebarOpen()).toBe(true);
  });

  it('should close the sidebar', () => {
    component.closeSidebar();
    expect(component.sidebarService.isSidebarOpen()).toBe(false);
  });

  it('should toggle options', () => {
    jest.spyOn(component.sidebarService, 'toggleOptionsState');
    component.openOptions();
    expect(component.sidebarService.toggleOptionsState).toHaveBeenCalled();
  });
});
