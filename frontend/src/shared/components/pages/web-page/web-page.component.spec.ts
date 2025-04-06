import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPageComponent } from './web-page.component';
import { SidebarComponent } from '../../organisms/sidebar/sidebar.component';
import { ConvoListComponent } from '../../molecules/convo-list/convo-list.component';
import { MainMenuComponent } from '../../molecules/main-menu/main-menu.component';
import { InputFieldComponent } from '../../molecules/input-field/input-field.component';
import { FloatingButton } from '../../molecules/floating-button/floating-button';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { By } from '@angular/platform-browser';
import { Chat } from '../../../types/chat';

describe('WepPageComponent', () => {
  let component: WebPageComponent;
  let fixture: ComponentFixture<WebPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WebPageComponent,
        SidebarComponent,
        ConvoListComponent,
        MainMenuComponent,
        InputFieldComponent,
        FloatingButton,
        CommonModule
      ],
      providers: [
        {
          provide: ChatService,
          useValue: { currentChat: null, switchFavouriteState: jest.fn().mockReturnValue({}) }
        },
        { provide: ModelService, useValue: { modelArray: [], switchFavouriteState: jest.fn() } },
        provideHttpClient(withInterceptorsFromDi())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WebPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SidebarComponent', () => {
    const sidebarElement = fixture.debugElement.query(By.directive(SidebarComponent));
    expect(sidebarElement).toBeTruthy();
  });

  it('should render ConvoListComponent', () => {
    const convoListElement = fixture.debugElement.query(By.directive(ConvoListComponent));
    expect(convoListElement).toBeTruthy();
  });

  it('should render InputFieldComponent when currentChat is defined', () => {
    component.chatService.currentChat = new Chat();
    fixture.detectChanges();
    const inputFieldElement = fixture.debugElement.query(By.directive(InputFieldComponent));
    expect(inputFieldElement).toBeTruthy();
  });

  it('should render FloatingPanelComponent', () => {
    const floatingPanelElement = fixture.debugElement.query(By.directive(MainMenuComponent));
    expect(floatingPanelElement).toBeTruthy();
  });

  it('should render FloatingButton if currentChat is not null', () => {
    component.chatService.currentChat = new Chat();
    fixture.detectChanges();
    const floatingButtonElement = fixture.debugElement.query(By.directive(FloatingButton));
    expect(floatingButtonElement).toBeTruthy();
  });

  it('should toggle favourite state on FloatingButton click', () => {
    jest.spyOn(component.chatService, 'switchFavouriteState');

    const chat = new Chat();

    component.chatService.currentChat = chat;
    component.chatService.chatList.push(chat);

    fixture.detectChanges();
    const floatingButtonElement = fixture.debugElement.query(By.directive(FloatingButton));
    floatingButtonElement.triggerEventHandler('onClick', null);

    expect(component.chatService.switchFavouriteState).toHaveBeenCalled();
  });
});
