import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIshranaComponent } from './admin-ishrana.component';

describe('AdminIshranaComponent', () => {
  let component: AdminIshranaComponent;
  let fixture: ComponentFixture<AdminIshranaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIshranaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIshranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
