import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAuditComponent } from './gov-audit.component';

describe('GovAuditComponent', () => {
  let component: GovAuditComponent;
  let fixture: ComponentFixture<GovAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
