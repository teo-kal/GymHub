import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerTreningComponent } from './trener-trening.component';

describe('TrenerTreningComponent', () => {
  let component: TrenerTreningComponent;
  let fixture: ComponentFixture<TrenerTreningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerTreningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerTreningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
