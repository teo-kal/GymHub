import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeHamstringsComponent } from './clan-vezbe-hamstrings.component';

describe('ClanVezbeHamstringsComponent', () => {
  let component: ClanVezbeHamstringsComponent;
  let fixture: ComponentFixture<ClanVezbeHamstringsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeHamstringsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeHamstringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
