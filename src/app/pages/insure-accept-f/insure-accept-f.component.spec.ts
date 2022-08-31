import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureAcceptFComponent } from './insure-accept-f.component';

describe('InsureAcceptFComponent', () => {
  let component: InsureAcceptFComponent;
  let fixture: ComponentFixture<InsureAcceptFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsureAcceptFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureAcceptFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
