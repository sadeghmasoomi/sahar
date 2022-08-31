import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeEducationComponent } from './edite-education.component';

describe('EditeEducationComponent', () => {
  let component: EditeEducationComponent;
  let fixture: ComponentFixture<EditeEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
