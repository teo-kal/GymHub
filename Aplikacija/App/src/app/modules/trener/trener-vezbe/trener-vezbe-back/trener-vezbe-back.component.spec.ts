import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeBackComponent } from './trener-vezbe-back.component';

describe('TrenerVezbeBackComponent', () => {
  let component: TrenerVezbeBackComponent;
  let fixture: ComponentFixture<TrenerVezbeBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
