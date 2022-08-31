import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IacpaContractControlComponent } from './iacpa-contract-control.component';

describe('IacpaContractControlComponent', () => {
  let component: IacpaContractControlComponent;
  let fixture: ComponentFixture<IacpaContractControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IacpaContractControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IacpaContractControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
