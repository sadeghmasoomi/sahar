import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoCComponent } from './user-info-c.component';

describe('UserInfoCComponent', () => {
  let component: UserInfoCComponent;
  let fixture: ComponentFixture<UserInfoCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
