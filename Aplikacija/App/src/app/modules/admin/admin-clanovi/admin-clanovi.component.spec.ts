import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClanoviComponent } from './admin-clanovi.component';

describe('AdminClanoviComponent', () => {
  let component: AdminClanoviComponent;
  let fixture: ComponentFixture<AdminClanoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClanoviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClanoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
