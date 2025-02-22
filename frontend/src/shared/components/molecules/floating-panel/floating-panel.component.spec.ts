import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingPanelComponent } from './floating-panel.component';

describe('FloatingPanelComponent', () => {
  let component: FloatingPanelComponent;
  let fixture: ComponentFixture<FloatingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
