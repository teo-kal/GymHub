import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerRadioComponent } from './trener-radio.component';

describe('TrenerRadioComponent', () => {
  let component: TrenerRadioComponent;
  let fixture: ComponentFixture<TrenerRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
