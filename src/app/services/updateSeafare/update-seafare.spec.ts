import { TestBed } from '@angular/core/testing';

import { UpdateSeafare } from './update-seafare';

describe('UpdateSeafare', () => {
  let service: UpdateSeafare;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSeafare);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
