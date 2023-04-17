import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeBicepsComponent } from './clan-vezbe-biceps.component';

describe('ClanVezbeBicepsComponent', () => {
  let component: ClanVezbeBicepsComponent;
  let fixture: ComponentFixture<ClanVezbeBicepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeBicepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeBicepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
