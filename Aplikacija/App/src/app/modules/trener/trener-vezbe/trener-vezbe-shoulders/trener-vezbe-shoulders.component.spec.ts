import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerVezbeShouldersComponent } from './trener-vezbe-shoulders.component';

describe('TrenerVezbeShouldersComponent', () => {
  let component: TrenerVezbeShouldersComponent;
  let fixture: ComponentFixture<TrenerVezbeShouldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerVezbeShouldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerVezbeShouldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
