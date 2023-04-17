import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanIshranaComponent } from './clan-ishrana.component';

describe('ClanIshranaComponent', () => {
  let component: ClanIshranaComponent;
  let fixture: ComponentFixture<ClanIshranaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanIshranaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanIshranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
