import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeTricepsComponent } from './clan-vezbe-triceps.component';

describe('ClanVezbeTricepsComponent', () => {
  let component: ClanVezbeTricepsComponent;
  let fixture: ComponentFixture<ClanVezbeTricepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeTricepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeTricepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
