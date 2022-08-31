import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAuditorComponent } from './member-auditor.component';

describe('MemberAuditorComponent', () => {
  let component: MemberAuditorComponent;
  let fixture: ComponentFixture<MemberAuditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAuditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
