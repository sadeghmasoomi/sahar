import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmAssessmentComponent } from './firm-assessment.component';

describe('FirmAssessmentComponent', () => {
  let component: FirmAssessmentComponent;
  let fixture: ComponentFixture<FirmAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
