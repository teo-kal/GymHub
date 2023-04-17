import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlutesComponent } from './glutes.component';

describe('GlutesComponent', () => {
  let component: GlutesComponent;
  let fixture: ComponentFixture<GlutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
