import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerKlijentiComponent } from './trener-klijenti.component';

describe('TrenerKlijentiComponent', () => {
  let component: TrenerKlijentiComponent;
  let fixture: ComponentFixture<TrenerKlijentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerKlijentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerKlijentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
