import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAuditorAcceptComponent } from './member-auditor-accept.component';

describe('MemberAuditorAcceptComponent', () => {
  let component: MemberAuditorAcceptComponent;
  let fixture: ComponentFixture<MemberAuditorAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAuditorAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAuditorAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
