import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeBackComponent } from './clan-vezbe-back.component';

describe('ClanVezbeBackComponent', () => {
  let component: ClanVezbeBackComponent;
  let fixture: ComponentFixture<ClanVezbeBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
