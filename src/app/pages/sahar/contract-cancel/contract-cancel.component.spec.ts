import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCancelComponent } from './contract-cancel.component';

describe('ContractCancelComponent', () => {
  let component: ContractCancelComponent;
  let fixture: ComponentFixture<ContractCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
