import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeObliquesComponent } from './trener-vezbe-obliques.component';

describe('TrenerVezbeObliquesComponent', () => {
  let component: TrenerVezbeObliquesComponent;
  let fixture: ComponentFixture<TrenerVezbeObliquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeObliquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeObliquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
