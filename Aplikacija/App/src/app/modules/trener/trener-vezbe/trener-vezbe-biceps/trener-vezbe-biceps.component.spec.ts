import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeBicepsComponent } from './trener-vezbe-biceps.component';

describe('TrenerVezbeBicepsComponent', () => {
  let component: TrenerVezbeBicepsComponent;
  let fixture: ComponentFixture<TrenerVezbeBicepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeBicepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeBicepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
