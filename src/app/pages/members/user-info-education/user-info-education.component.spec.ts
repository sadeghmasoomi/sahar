import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoEducationComponent } from './user-info-education.component';

describe('UserInfoEducationComponent', () => {
  let component: UserInfoEducationComponent;
  let fixture: ComponentFixture<UserInfoEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
