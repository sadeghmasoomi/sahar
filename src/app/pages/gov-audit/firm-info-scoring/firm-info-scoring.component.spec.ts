import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmInfoScoringComponent } from './firm-info-scoring.component';

describe('FirmInfoScoringComponent', () => {
  let component: FirmInfoScoringComponent;
  let fixture: ComponentFixture<FirmInfoScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmInfoScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmInfoScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
