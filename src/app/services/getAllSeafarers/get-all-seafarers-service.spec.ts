import { TestBed } from '@angular/core/testing';

import { GetAllSeafarersService } from './get-all-seafarers-service';

describe('GetAllSeafarers', () => {
  let service: GetAllSeafarersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllSeafarersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
