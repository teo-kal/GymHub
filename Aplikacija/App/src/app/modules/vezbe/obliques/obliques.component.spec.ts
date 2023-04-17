import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObliquesComponent } from './obliques.component';

describe('ObliquesComponent', () => {
  let component: ObliquesComponent;
  let fixture: ComponentFixture<ObliquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObliquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObliquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
