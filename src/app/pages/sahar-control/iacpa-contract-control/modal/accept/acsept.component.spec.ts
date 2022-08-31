import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcseptComponent } from './acsept.component';

describe('AcseptComponent', () => {
  let component: AcseptComponent;
  let fixture: ComponentFixture<AcseptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcseptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcseptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
