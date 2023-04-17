import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTreningComponent } from './admin-trening.component';

describe('AdminTreningComponent', () => {
  let component: AdminTreningComponent;
  let fixture: ComponentFixture<AdminTreningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTreningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTreningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
