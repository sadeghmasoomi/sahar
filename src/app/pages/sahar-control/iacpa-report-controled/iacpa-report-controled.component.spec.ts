import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IacpaReportControledComponent } from './iacpa-report-controled.component';

describe('IacpaReportControledComponent', () => {
  let component: IacpaReportControledComponent;
  let fixture: ComponentFixture<IacpaReportControledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IacpaReportControledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IacpaReportControledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
