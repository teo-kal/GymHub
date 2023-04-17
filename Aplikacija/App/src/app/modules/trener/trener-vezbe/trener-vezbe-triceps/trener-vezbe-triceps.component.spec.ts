import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeTricepsComponent } from './trener-vezbe-triceps.component';

describe('TrenerVezbeTricepsComponent', () => {
  let component: TrenerVezbeTricepsComponent;
  let fixture: ComponentFixture<TrenerVezbeTricepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeTricepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeTricepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
