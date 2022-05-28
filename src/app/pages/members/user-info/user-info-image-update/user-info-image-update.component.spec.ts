import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoImageUpdateComponent } from './user-info-image-update.component';

describe('UserInfoImageUpdateComponent', () => {
  let component: UserInfoImageUpdateComponent;
  let fixture: ComponentFixture<UserInfoImageUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoImageUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoImageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
