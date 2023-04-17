import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VezbeMainTrenerComponent } from './vezbe-main-trener.component';

describe('VezbeMainTrenerComponent', () => {
  let component: VezbeMainTrenerComponent;
  let fixture: ComponentFixture<VezbeMainTrenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VezbeMainTrenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VezbeMainTrenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
