import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmContractReportComponent } from './firm-contract-report.component';

describe('FirmContractReportComponent', () => {
  let component: FirmContractReportComponent;
  let fixture: ComponentFixture<FirmContractReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmContractReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmContractReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
