import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditContractProcessManagerAcceptComponent } from './audit-contract-process-manager-accept.component';

describe('AuditContractProcessManagerAcceptComponent', () => {
  let component: AuditContractProcessManagerAcceptComponent;
  let fixture: ComponentFixture<AuditContractProcessManagerAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditContractProcessManagerAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditContractProcessManagerAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
