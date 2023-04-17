import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeComponent } from './trener-vezbe.component';

describe('TrenerVezbeComponent', () => {
  let component: TrenerVezbeComponent;
  let fixture: ComponentFixture<TrenerVezbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
