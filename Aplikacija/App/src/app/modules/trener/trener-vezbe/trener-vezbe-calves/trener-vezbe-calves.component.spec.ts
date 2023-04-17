import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeCalvesComponent } from './trener-vezbe-calves.component';

describe('TrenerVezbeCalvesComponent', () => {
  let component: TrenerVezbeCalvesComponent;
  let fixture: ComponentFixture<TrenerVezbeCalvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeCalvesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeCalvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
