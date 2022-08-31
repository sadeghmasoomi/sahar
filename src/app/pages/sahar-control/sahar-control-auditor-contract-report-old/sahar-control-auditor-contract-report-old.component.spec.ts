import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaharControlAuditorContractReportOldComponent } from './sahar-control-auditor-contract-report-old.component';

describe('SaharControlAuditorContractReportOldComponent', () => {
  let component: SaharControlAuditorContractReportOldComponent;
  let fixture: ComponentFixture<SaharControlAuditorContractReportOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaharControlAuditorContractReportOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaharControlAuditorContractReportOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
