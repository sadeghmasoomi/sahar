import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfAuditorContractReportComponent } from './pdf-auditor-contract-report.component';

describe('PdfAuditorContractReportComponent', () => {
  let component: PdfAuditorContractReportComponent;
  let fixture: ComponentFixture<PdfAuditorContractReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfAuditorContractReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfAuditorContractReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
