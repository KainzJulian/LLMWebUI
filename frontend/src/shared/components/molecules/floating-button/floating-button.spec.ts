import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingButton } from './floating-button';
import { By } from '@angular/platform-browser';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';

describe('FloatingButton', () => {
  let component: FloatingButton;
  let fixture: ComponentFixture<FloatingButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingButton]
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event', () => {
    const onClickSpy = jest.fn();
    component.onClick.subscribe(onClickSpy);
    component.onClick.emit();
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should set config correctly', () => {
    component.config = { top: 255, left: 254, right: 253, bottom: 252 };
    expect(component.config).toEqual({ top: 255, left: 254, right: 253, bottom: 252 });
  });

  it('should only set one of top', () => {
    component.config = { top: 10 };
    expect(component.config).toEqual({
      top: 10,
      left: undefined,
      right: undefined,
      bottom: undefined
    });
  });

  it('should render BaseButton and Icon components', () => {
    expect(fixture.debugElement.query(By.directive(BaseButton))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(Icon))).toBeTruthy();
  });
});
