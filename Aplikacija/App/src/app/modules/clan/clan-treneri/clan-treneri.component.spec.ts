import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanTreneriComponent } from './clan-treneri.component';

describe('ClanTreneriComponent', () => {
  let component: ClanTreneriComponent;
  let fixture: ComponentFixture<ClanTreneriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanTreneriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanTreneriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
