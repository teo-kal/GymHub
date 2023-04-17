import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeCalvesComponent } from './clan-vezbe-calves.component';

describe('ClanVezbeCalvesComponent', () => {
  let component: ClanVezbeCalvesComponent;
  let fixture: ComponentFixture<ClanVezbeCalvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeCalvesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeCalvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
