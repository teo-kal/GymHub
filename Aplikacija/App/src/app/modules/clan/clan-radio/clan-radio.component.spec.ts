import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanRadioComponent } from './clan-radio.component';

describe('ClanRadioComponent', () => {
  let component: ClanRadioComponent;
  let fixture: ComponentFixture<ClanRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
