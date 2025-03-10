import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoListComponent } from './convo-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ConvoListComponent', () => {
  let component: ConvoListComponent;
  let fixture: ComponentFixture<ConvoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvoListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConvoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
