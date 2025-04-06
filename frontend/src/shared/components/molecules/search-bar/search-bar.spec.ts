import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBar } from './search-bar';
import { SearchBarService } from '../../services/search-bar.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  let searchServiceMock: jest.Mocked<SearchBarService>;

  beforeEach(async () => {
    searchServiceMock = {
      getSearchState: jest.fn().mockReturnValue(false),
      switchSearchState: jest.fn(),
      setSearchState: jest.fn()
    } as unknown as jest.Mocked<SearchBarService>;

    await TestBed.configureTestingModule({
      imports: [SearchBar],
      providers: [
        { provide: SearchBarService, useValue: searchServiceMock },
        provideHttpClient(withInterceptorsFromDi())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
