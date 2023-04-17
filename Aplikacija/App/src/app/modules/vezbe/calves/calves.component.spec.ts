import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalvesComponent } from './calves.component';

describe('CalvesComponent', () => {
  let component: CalvesComponent;
  let fixture: ComponentFixture<CalvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalvesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
