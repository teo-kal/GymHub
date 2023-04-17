import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeQuadsComponent } from './trener-vezbe-quads.component';

describe('TrenerVezbeQuadsComponent', () => {
  let component: TrenerVezbeQuadsComponent;
  let fixture: ComponentFixture<TrenerVezbeQuadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeQuadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeQuadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
