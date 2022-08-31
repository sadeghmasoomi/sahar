import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureViewComponent } from './insure-view.component';

describe('InsureViewComponent', () => {
  let component: InsureViewComponent;
  let fixture: ComponentFixture<InsureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
