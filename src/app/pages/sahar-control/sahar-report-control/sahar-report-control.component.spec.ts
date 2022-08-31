import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaharReportControlComponent } from './sahar-report-control.component';

describe('SaharReportControlComponent', () => {
  let component: SaharReportControlComponent;
  let fixture: ComponentFixture<SaharReportControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaharReportControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaharReportControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
