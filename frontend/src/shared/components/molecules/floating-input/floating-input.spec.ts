import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingInput } from './floating-input';

describe('FloatingInput', () => {
  let component: FloatingInput;
  let fixture: ComponentFixture<FloatingInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
