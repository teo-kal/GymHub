import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecksComponent } from './pecks.component';

describe('PecksComponent', () => {
  let component: PecksComponent;
  let fixture: ComponentFixture<PecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PecksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
