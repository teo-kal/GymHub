import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanZakaziTreningComponent } from './clan-zakazi-trening.component';

describe('ClanZakaziTreningComponent', () => {
  let component: ClanZakaziTreningComponent;
  let fixture: ComponentFixture<ClanZakaziTreningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanZakaziTreningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanZakaziTreningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
