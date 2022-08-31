import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmAuditorAcceptComponent } from './firm-auditor-accept.component';

describe('FirmAuditorAcceptComponent', () => {
  let component: FirmAuditorAcceptComponent;
  let fixture: ComponentFixture<FirmAuditorAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmAuditorAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmAuditorAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
