import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainRegisterComponent } from './train-register.component';

describe('TrainRegisterComponent', () => {
  let component: TrainRegisterComponent;
  let fixture: ComponentFixture<TrainRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
