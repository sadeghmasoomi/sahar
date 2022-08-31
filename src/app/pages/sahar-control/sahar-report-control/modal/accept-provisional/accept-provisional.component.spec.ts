import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptProvisionalComponent } from './accept-provisional.component';

describe('AcceptProvisionalComponent', () => {
  let component: AcceptProvisionalComponent;
  let fixture: ComponentFixture<AcceptProvisionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptProvisionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptProvisionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
