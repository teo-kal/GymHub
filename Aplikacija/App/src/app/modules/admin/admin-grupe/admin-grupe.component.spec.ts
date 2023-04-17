import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrupeComponent } from './admin-grupe.component';

describe('AdminGrupeComponent', () => {
  let component: AdminGrupeComponent;
  let fixture: ComponentFixture<AdminGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGrupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
