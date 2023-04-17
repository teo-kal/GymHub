import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanPodesavanjaComponent } from './clan-podesavanja.component';

describe('ClanPodesavanjaComponent', () => {
  let component: ClanPodesavanjaComponent;
  let fixture: ComponentFixture<ClanPodesavanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanPodesavanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanPodesavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
