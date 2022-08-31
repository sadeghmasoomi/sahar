import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorContractReportOldComponent } from './auditor-contract-report-old.component';

describe('AuditorContractReportOldComponent', () => {
  let component: AuditorContractReportOldComponent;
  let fixture: ComponentFixture<AuditorContractReportOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorContractReportOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorContractReportOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
