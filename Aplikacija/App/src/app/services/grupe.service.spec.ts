import { TestBed } from '@angular/core/testing';

import { GrupeService } from './grupe.service';

describe('GrupeService', () => {
  let service: GrupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
