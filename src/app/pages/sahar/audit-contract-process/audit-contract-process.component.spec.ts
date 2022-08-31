import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditContractProcessComponent } from './audit-contract-process.component';

describe('AuditContractProcessComponent', () => {
  let component: AuditContractProcessComponent;
  let fixture: ComponentFixture<AuditContractProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditContractProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditContractProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
