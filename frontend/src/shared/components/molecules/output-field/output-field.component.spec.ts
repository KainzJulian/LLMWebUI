import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputFieldComponent } from './output-field.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('OutputFieldComponent', () => {
  let component: OutputFieldComponent;
  let fixture: ComponentFixture<OutputFieldComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputFieldComponent],
      providers: [
        { provide: 'ModelService', useValue: {} },
        { provide: 'ChatService', useValue: {} },
        { provide: 'LLMRequestService', useValue: {} },
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OutputFieldComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display text input', () => {
    component.text = 'Test text';
    fixture.detectChanges();
    const textElement = debugElement.query(By.css('.output__text')).nativeElement;
    expect(textElement.innerHTML).toBe('Test text');
  });

  it('should apply textStyle class', () => {
    component.textStyle = 'text--user';
    fixture.detectChanges();
    const divElement = debugElement.query(By.css('div')).nativeElement;
    expect(divElement.classList).toContain('text--user');
  });

  it('should return true for isAiText when textStyle is text--ai', () => {
    component.textStyle = 'text--ai';
    expect(component.isAiText()).toBeTruthy();
  });

  it('should return false for isAiText when textStyle is text--user', () => {
    component.textStyle = 'text--user';
    expect(component.isAiText()).toBeFalsy();
  });
});
