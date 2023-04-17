import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbePecksComponent } from './trener-vezbe-pecks.component';

describe('TrenerVezbePecksComponent', () => {
  let component: TrenerVezbePecksComponent;
  let fixture: ComponentFixture<TrenerVezbePecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbePecksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbePecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
