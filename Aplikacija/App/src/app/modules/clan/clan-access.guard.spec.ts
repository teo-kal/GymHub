import { TestBed } from '@angular/core/testing';

import { ClanAccessGuard } from './clan-access.guard';

describe('ClanAccessGuard', () => {
  let guard: ClanAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClanAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
