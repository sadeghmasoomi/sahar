import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAcceptComponent } from './un-accept.component';

describe('UnAcceptComponent', () => {
  let component: UnAcceptComponent;
  let fixture: ComponentFixture<UnAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
