import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesionsComponent } from './lesions.component';

describe('LesionsComponent', () => {
  let component: LesionsComponent;
  let fixture: ComponentFixture<LesionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
