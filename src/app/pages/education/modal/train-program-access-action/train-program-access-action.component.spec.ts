import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainProgramAccessActionComponent } from './train-program-access-action.component';

describe('TrainProgramAccessActionComponent', () => {
  let component: TrainProgramAccessActionComponent;
  let fixture: ComponentFixture<TrainProgramAccessActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainProgramAccessActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainProgramAccessActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
