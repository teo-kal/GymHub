import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeQuadsComponent } from './clan-vezbe-quads.component';

describe('ClanVezbeQuadsComponent', () => {
  let component: ClanVezbeQuadsComponent;
  let fixture: ComponentFixture<ClanVezbeQuadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeQuadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeQuadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
