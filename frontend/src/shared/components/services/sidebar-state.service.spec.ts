import { TestBed } from '@angular/core/testing';

import { SidebarStateService } from './sidebar-state.service';

describe('SidebarStateService', () => {
  let service: SidebarStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle the state', () => {
    service.toggleState();
    expect(service.isOptionsOpen()).toBe(true);
  });

  it('should set the state', () => {
    service.setState(true);
    expect(service.isOptionsOpen()).toBe(true);
  });
});
