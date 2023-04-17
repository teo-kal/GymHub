import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeHamstringsComponent } from './trener-vezbe-hamstrings.component';

describe('TrenerVezbeHamstringsComponent', () => {
  let component: TrenerVezbeHamstringsComponent;
  let fixture: ComponentFixture<TrenerVezbeHamstringsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeHamstringsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeHamstringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
