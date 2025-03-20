import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingPanel } from './floating-panel';

describe('FloatingPanel', () => {
  let component: FloatingPanel;
  let fixture: ComponentFixture<FloatingPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
