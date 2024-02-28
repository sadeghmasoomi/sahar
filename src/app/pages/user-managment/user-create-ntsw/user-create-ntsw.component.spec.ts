import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateNtswComponent } from './user-create-ntsw.component';

describe('UserCreateNtswComponent', () => {
  let component: UserCreateNtswComponent;
  let fixture: ComponentFixture<UserCreateNtswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateNtswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateNtswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
