import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatiClanarinuComponent } from './plati-clanarinu.component';

describe('PlatiClanarinuComponent', () => {
  let component: PlatiClanarinuComponent;
  let fixture: ComponentFixture<PlatiClanarinuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatiClanarinuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatiClanarinuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
