import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VezbeMainComponent } from './vezbe-main.component';

describe('VezbeMainComponent', () => {
  let component: VezbeMainComponent;
  let fixture: ComponentFixture<VezbeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VezbeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VezbeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
