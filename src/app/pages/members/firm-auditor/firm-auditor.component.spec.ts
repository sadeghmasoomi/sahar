import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmAuditorComponent } from './firm-auditor.component';

describe('FirmAuditorComponent', () => {
  let component: FirmAuditorComponent;
  let fixture: ComponentFixture<FirmAuditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmAuditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
