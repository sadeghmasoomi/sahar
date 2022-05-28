import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateOperationComponent } from './user-create-operation.component';

describe('UserCreateOperationComponent', () => {
  let component: UserCreateOperationComponent;
  let fixture: ComponentFixture<UserCreateOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
