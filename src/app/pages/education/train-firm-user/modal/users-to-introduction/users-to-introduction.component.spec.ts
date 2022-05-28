import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToIntroductionComponent } from './users-to-introduction.component';

describe('UsersToIntroductionComponent', () => {
  let component: UsersToIntroductionComponent;
  let fixture: ComponentFixture<UsersToIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersToIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersToIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
