import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaharReportsComponent } from './sahar-reports.component';

describe('SaharReportsComponent', () => {
  let component: SaharReportsComponent;
  let fixture: ComponentFixture<SaharReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaharReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaharReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
