import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenerMainPageComponent } from './trener-main-page.component';

describe('TrenerMainPageComponent', () => {
  let component: TrenerMainPageComponent;
  let fixture: ComponentFixture<TrenerMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenerMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenerMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
