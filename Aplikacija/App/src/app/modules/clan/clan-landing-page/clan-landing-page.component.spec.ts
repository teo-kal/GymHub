import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanLandingPageComponent } from './clan-landing-page.component';

describe('ClanLandingPageComponent', () => {
  let component: ClanLandingPageComponent;
  let fixture: ComponentFixture<ClanLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
