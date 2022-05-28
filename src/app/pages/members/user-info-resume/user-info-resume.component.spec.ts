import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoResumeComponent } from './user-info-resume.component';

describe('UserInfoResumeComponent', () => {
  let component: UserInfoResumeComponent;
  let fixture: ComponentFixture<UserInfoResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
