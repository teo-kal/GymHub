import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeGlutesComponent } from './clan-vezbe-glutes.component';

describe('ClanVezbeGlutesComponent', () => {
  let component: ClanVezbeGlutesComponent;
  let fixture: ComponentFixture<ClanVezbeGlutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeGlutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeGlutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
