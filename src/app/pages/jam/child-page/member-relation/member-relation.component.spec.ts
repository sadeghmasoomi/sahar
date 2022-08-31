import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRelationComponent } from './member-relation.component';

describe('MemberRelationComponent', () => {
  let component: MemberRelationComponent;
  let fixture: ComponentFixture<MemberRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
