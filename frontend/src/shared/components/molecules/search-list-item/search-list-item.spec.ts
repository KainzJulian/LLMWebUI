import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListItem } from './search-list-item';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SearchListItem', () => {
  let component: SearchListItem;
  let fixture: ComponentFixture<SearchListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchListItem],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
