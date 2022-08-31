import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirmAssessmentComponent } from './add-firm-assessment.component';

describe('AddFirmAssessmentComponent', () => {
  let component: AddFirmAssessmentComponent;
  let fixture: ComponentFixture<AddFirmAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFirmAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFirmAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
