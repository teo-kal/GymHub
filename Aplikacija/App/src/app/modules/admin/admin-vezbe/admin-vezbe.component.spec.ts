import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVezbeComponent } from './admin-vezbe.component';

describe('AdminVezbeComponent', () => {
  let component: AdminVezbeComponent;
  let fixture: ComponentFixture<AdminVezbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVezbeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVezbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
