import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberAuditorComponent } from './add-member-auditor.component';

describe('AddMemberAuditorComponent', () => {
  let component: AddMemberAuditorComponent;
  let fixture: ComponentFixture<AddMemberAuditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberAuditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
