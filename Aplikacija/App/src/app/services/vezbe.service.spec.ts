import { TestBed } from '@angular/core/testing';

import { VezbeService } from './vezbe.service';

describe('VezbeService', () => {
  let service: VezbeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VezbeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
