import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamstringsComponent } from './hamstrings.component';

describe('HamstringsComponent', () => {
  let component: HamstringsComponent;
  let fixture: ComponentFixture<HamstringsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HamstringsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HamstringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
