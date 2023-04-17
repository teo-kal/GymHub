import { TestBed } from '@angular/core/testing';

import { TrenerAccessGuard } from './trener-access.guard';

describe('TrenerAccessGuard', () => {
  let guard: TrenerAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrenerAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
