import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WepPageComponent } from './wep-page.component';

describe('WepPageComponent', () => {
  let component: WepPageComponent;
  let fixture: ComponentFixture<WepPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WepPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WepPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
