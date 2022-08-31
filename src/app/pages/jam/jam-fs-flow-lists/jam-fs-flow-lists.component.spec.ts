import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamFsFlowListsComponent } from './jam-fs-flow-lists.component';

describe('JamFsFlowListsComponent', () => {
  let component: JamFsFlowListsComponent;
  let fixture: ComponentFixture<JamFsFlowListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamFsFlowListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamFsFlowListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
