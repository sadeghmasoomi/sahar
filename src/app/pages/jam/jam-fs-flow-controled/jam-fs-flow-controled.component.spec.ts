import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamFsFlowControledComponent } from './jam-fs-flow-controled.component';

describe('JamFsFlowControledComponent', () => {
  let component: JamFsFlowControledComponent;
  let fixture: ComponentFixture<JamFsFlowControledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamFsFlowControledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamFsFlowControledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
