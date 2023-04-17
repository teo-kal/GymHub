import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeShouldersComponent } from './clan-vezbe-shoulders.component';

describe('ClanVezbeShouldersComponent', () => {
  let component: ClanVezbeShouldersComponent;
  let fixture: ComponentFixture<ClanVezbeShouldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeShouldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeShouldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
