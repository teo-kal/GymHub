import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanVezbeObliquesComponent } from './clan-vezbe-obliques.component';

describe('ClanVezbeObliquesComponent', () => {
  let component: ClanVezbeObliquesComponent;
  let fixture: ComponentFixture<ClanVezbeObliquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanVezbeObliquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanVezbeObliquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
