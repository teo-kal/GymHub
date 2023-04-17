import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeGlutesComponent } from './trener-vezbe-glutes.component';

describe('TrenerVezbeGlutesComponent', () => {
  let component: TrenerVezbeGlutesComponent;
  let fixture: ComponentFixture<TrenerVezbeGlutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeGlutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeGlutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
