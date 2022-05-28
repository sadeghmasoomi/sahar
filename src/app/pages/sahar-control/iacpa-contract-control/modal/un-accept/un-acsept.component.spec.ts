import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAcseptComponent } from './un-acsept.component';

describe('UnAcseptComponent', () => {
  let component: UnAcseptComponent;
  let fixture: ComponentFixture<UnAcseptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAcseptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAcseptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
