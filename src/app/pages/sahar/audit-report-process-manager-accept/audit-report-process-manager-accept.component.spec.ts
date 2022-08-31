import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditReportProcessManagerAcceptComponent } from './audit-report-process-manager-accept.component';

describe('AuditReportProcessManagerAcceptComponent', () => {
  let component: AuditReportProcessManagerAcceptComponent;
  let fixture: ComponentFixture<AuditReportProcessManagerAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditReportProcessManagerAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditReportProcessManagerAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
