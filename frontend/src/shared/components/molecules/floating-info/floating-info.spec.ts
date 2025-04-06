import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingInfo } from './floating-info';

describe('FloatingInfo', () => {
  let component: FloatingInfo;
  let fixture: ComponentFixture<FloatingInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
