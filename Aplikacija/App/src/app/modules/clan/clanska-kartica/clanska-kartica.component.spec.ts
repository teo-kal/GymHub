import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanskaKarticaComponent } from './clanska-kartica.component';

describe('ClanskaKarticaComponent', () => {
  let component: ClanskaKarticaComponent;
  let fixture: ComponentFixture<ClanskaKarticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanskaKarticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanskaKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
