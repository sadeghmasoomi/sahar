import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostAndBenefitComponent } from './cost-and-benefit.component';

describe('CostAndBenefitComponent', () => {
  let component: CostAndBenefitComponent;
  let fixture: ComponentFixture<CostAndBenefitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostAndBenefitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostAndBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
