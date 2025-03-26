import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListItem } from './search-list-item';

describe('SearchListItem', () => {
  let component: SearchListItem;
  let fixture: ComponentFixture<SearchListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
