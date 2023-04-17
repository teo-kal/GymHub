import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerPodesavanjaComponent } from './trener-podesavanja.component';

describe('TrenerPodesavanjaComponent', () => {
  let component: TrenerPodesavanjaComponent;
  let fixture: ComponentFixture<TrenerPodesavanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerPodesavanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerPodesavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
