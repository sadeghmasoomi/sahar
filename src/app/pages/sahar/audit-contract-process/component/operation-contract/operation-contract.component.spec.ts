import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationContractComponent } from './operation-contract.component';

describe('OperationContractComponent', () => {
  let component: OperationContractComponent;
  let fixture: ComponentFixture<OperationContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
