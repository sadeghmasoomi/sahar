import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEntityComponent } from './personal-entity.component';

describe('PersonalEntityComponent', () => {
  let component: PersonalEntityComponent;
  let fixture: ComponentFixture<PersonalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
