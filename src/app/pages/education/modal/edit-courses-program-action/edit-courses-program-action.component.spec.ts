import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursesProgramActionComponent } from './edit-courses-program-action.component';

describe('EditCoursesProgramActionComponent', () => {
  let component: EditCoursesProgramActionComponent;
  let fixture: ComponentFixture<EditCoursesProgramActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoursesProgramActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoursesProgramActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
