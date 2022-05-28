import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransAffiliatesComponent } from './trans-affiliates.component';

describe('TransAffiliatesComponent', () => {
  let component: TransAffiliatesComponent;
  let fixture: ComponentFixture<TransAffiliatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransAffiliatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransAffiliatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
