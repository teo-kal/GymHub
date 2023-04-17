import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeComponent } from './clan-vezbe.component';

describe('ClanVezbeComponent', () => {
  let component: ClanVezbeComponent;
  let fixture: ComponentFixture<ClanVezbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
