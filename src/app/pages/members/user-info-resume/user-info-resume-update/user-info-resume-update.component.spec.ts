import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoResumeUpdateComponent } from './user-info-resume-update.component';

describe('UserInfoResumeUpdateComponent', () => {
  let component: UserInfoResumeUpdateComponent;
  let fixture: ComponentFixture<UserInfoResumeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoResumeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoResumeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
