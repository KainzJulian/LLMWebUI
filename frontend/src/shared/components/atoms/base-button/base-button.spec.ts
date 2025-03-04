import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseButton } from './base-button';

describe('BaseButton', () => {
  let component: BaseButton;
  let fixture: ComponentFixture<BaseButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseButton]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseButton);
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

  it('should apply hover--icon class', () => {
    component.buttonClass = 'hover--icon';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').classList).toContain('hover--icon');
  });

  it('should not apply hover--icon class', () => {
    component.buttonClass = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').classList).not.toContain('hover--icon');
  });
});
