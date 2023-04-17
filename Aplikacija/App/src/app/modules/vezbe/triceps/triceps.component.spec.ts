import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TricepsComponent } from './triceps.component';

describe('TricepsComponent', () => {
  let component: TricepsComponent;
  let fixture: ComponentFixture<TricepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TricepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TricepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
