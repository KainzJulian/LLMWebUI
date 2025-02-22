import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListButton } from './list-button';

describe('ListButton', () => {
  let component: ListButton;
  let fixture: ComponentFixture<ListButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListButton]
    }).compileComponents();

    fixture = TestBed.createComponent(ListButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
