import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanMainPageComponent } from './clan-main-page.component';

describe('ClanMainPageComponent', () => {
  let component: ClanMainPageComponent;
  let fixture: ComponentFixture<ClanMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
