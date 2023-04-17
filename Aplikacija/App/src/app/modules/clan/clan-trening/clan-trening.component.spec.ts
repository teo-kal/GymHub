import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanTreningComponent } from './clan-trening.component';

describe('ClanTreningComponent', () => {
  let component: ClanTreningComponent;
  let fixture: ComponentFixture<ClanTreningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanTreningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanTreningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
