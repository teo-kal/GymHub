import { TestBed } from '@angular/core/testing';

import { TreningService } from './trening.service';

describe('TreningService', () => {
  let service: TreningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
