import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WepPageComponent } from './wep-page.component';
import { SidebarComponent } from '../../organisms/sidebar/sidebar.component';
import { ConvoListComponent } from '../../molecules/convo-list/convo-list.component';
import { FloatingPanelComponent } from '../../molecules/floating-panel/floating-panel.component';
import { InputFieldComponent } from '../../molecules/input-field/input-field.component';
import { FloatingButton } from '../../molecules/floating-button/floating-button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { ModelArray } from '../../../types/model';

describe('WepPageComponent', () => {
  let component: WepPageComponent;
  let fixture: ComponentFixture<WepPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WepPageComponent,
        SidebarComponent,
        ConvoListComponent,
        FloatingPanelComponent,
        InputFieldComponent,
        FloatingButton,
        CommonModule,
        HttpClientModule
      ],
      providers: [
        { provide: ChatService, useValue: { currentChat: null, switchFavouriteState: jest.fn() } },
        { provide: ModelService, useValue: { modelArray: [], switchFavouriteState: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WepPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
