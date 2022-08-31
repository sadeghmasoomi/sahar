import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamFsFlowControlComponent } from './jam-fs-flow-control.component';

describe('JamFsFlowControlComponent', () => {
  let component: JamFsFlowControlComponent;
  let fixture: ComponentFixture<JamFsFlowControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamFsFlowControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamFsFlowControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
