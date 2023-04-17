import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadsComponent } from './quads.component';

describe('QuadsComponent', () => {
  let component: QuadsComponent;
  let fixture: ComponentFixture<QuadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
