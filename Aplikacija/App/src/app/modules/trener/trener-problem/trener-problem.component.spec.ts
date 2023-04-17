import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerProblemComponent } from './trener-problem.component';

describe('TrenerProblemComponent', () => {
  let component: TrenerProblemComponent;
  let fixture: ComponentFixture<TrenerProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
