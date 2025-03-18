import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldComponent } from './input-field.component';
import { LLMRequestService } from '../../services/llm-request.service';
import { ModelService } from '../../services/model.service';
import { ChatService } from '../../services/chat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;
  let llmService: LLMRequestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, InputFieldComponent],
      providers: [ChatService, ModelService, LLMRequestService]
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    llmService = TestBed.inject(LLMRequestService);
    llmService = TestBed.inject(LLMRequestService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear input field on sendRequest', () => {
    const inputElement: HTMLTextAreaElement = fixture.debugElement.query(
      By.css('textarea')
    ).nativeElement;
    inputElement.value = 'test input';
    component.sendRequest(inputElement.value);
    expect(inputElement.value).toBe('');
  });

  it('should call llmService.sendRequest on sendRequest', () => {
    const spy = jest.spyOn(llmService, 'sendRequest');
    component.sendRequest('test input');
    expect(spy).toHaveBeenCalled();
  });

  it('should set isLoading to false on cancelRequest', () => {
    component.cancelRequest();
    expect(component.loadingState.isLoading()).toBe(false);
  });
});
