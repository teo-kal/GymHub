import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanProblemComponent } from './clan-problem.component';

describe('ClanProblemComponent', () => {
  let component: ClanProblemComponent;
  let fixture: ComponentFixture<ClanProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
