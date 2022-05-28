import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoLanguageComponent } from './user-info-language.component';

describe('UserInfoLanguageComponent', () => {
  let component: UserInfoLanguageComponent;
  let fixture: ComponentFixture<UserInfoLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
