import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmReport1Component } from './firm-report1.component';

describe('FirmReport1Component', () => {
  let component: FirmReport1Component;
  let fixture: ComponentFixture<FirmReport1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmReport1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmReport1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
