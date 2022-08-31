import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamFsFlowHistoryComponent } from './jam-fs-flow-history.component';

describe('JamFsFlowHistoryComponent', () => {
  let component: JamFsFlowHistoryComponent;
  let fixture: ComponentFixture<JamFsFlowHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamFsFlowHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamFsFlowHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
