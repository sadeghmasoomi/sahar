import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestInformationComponent } from './rest-information.component';

describe('RestInformationComponent', () => {
  let component: RestInformationComponent;
  let fixture: ComponentFixture<RestInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
