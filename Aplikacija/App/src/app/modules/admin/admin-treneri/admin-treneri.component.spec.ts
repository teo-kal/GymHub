import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTreneriComponent } from './admin-treneri.component';

describe('AdminTreneriComponent', () => {
  let component: AdminTreneriComponent;
  let fixture: ComponentFixture<AdminTreneriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTreneriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTreneriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
