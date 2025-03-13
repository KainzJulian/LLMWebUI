import { TestBed } from '@angular/core/testing';

import { ReadListenStateService } from './readListen-state.service';

describe('ReaderStateService', () => {
  let service: ReadListenStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadListenStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the read aloud state', () => {
    service.setReadState(true);
    expect(service.getReadState()).toBe(true);

    service.setReadState(false);
    expect(service.getReadState()).toBe(false);
  });

  it('should switch the read aloud state', () => {
    service.setReadState(true);
    service.switchReadState();
    expect(service.getReadState()).toBe(false);
  });

  it('should set the listen state', () => {
    service.setListenState(true);
    expect(service.getListenState()).toBe(true);

    service.setListenState(false);
    expect(service.getListenState()).toBe(false);
  });

  it('should switch the listen state', () => {
    service.setListenState(true);
    service.switchListenState();
    expect(service.getListenState()).toBe(false);
  });
});
