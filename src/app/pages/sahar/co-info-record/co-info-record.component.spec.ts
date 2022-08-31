import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoInfoRecordComponent } from './co-info-record.component';

describe('CoInfoRecordComponent', () => {
  let component: CoInfoRecordComponent;
  let fixture: ComponentFixture<CoInfoRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoInfoRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoInfoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
