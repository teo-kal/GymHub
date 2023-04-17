import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerIshranaComponent } from './trener-ishrana.component';

describe('TrenerIshranaComponent', () => {
  let component: TrenerIshranaComponent;
  let fixture: ComponentFixture<TrenerIshranaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerIshranaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerIshranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
