import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbePecksComponent } from './clan-vezbe-pecks.component';

describe('ClanVezbePecksComponent', () => {
  let component: ClanVezbePecksComponent;
  let fixture: ComponentFixture<ClanVezbePecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbePecksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbePecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
