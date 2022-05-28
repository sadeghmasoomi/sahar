import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEducationUpdateComponent } from './user-education-update.component';

describe('UserEducationUpdateComponent', () => {
  let component: UserEducationUpdateComponent;
  let fixture: ComponentFixture<UserEducationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEducationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEducationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
