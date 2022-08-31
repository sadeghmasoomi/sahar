import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainFirmUserComponent } from './train-firm-user.component';

describe('TrainFirmUserComponent', () => {
  let component: TrainFirmUserComponent;
  let fixture: ComponentFixture<TrainFirmUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainFirmUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainFirmUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
