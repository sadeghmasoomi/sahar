import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorContractReportComponent } from './auditor-contract-report.component';

describe('AuditorContractReportComponent', () => {
  let component: AuditorContractReportComponent;
  let fixture: ComponentFixture<AuditorContractReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditorContractReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorContractReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
