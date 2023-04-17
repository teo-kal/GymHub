import { TestBed } from '@angular/core/testing';

import { IshranaService } from './ishrana.service';

describe('IshranaService', () => {
  let service: IshranaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IshranaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
