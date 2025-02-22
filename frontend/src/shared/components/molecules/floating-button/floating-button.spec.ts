import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingButton } from './floating-button';

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
});
