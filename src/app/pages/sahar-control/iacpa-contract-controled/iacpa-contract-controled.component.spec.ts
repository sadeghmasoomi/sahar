import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IacpaContractControledComponent } from './iacpa-contract-controled.component';

describe('IacpaContractControledComponent', () => {
  let component: IacpaContractControledComponent;
  let fixture: ComponentFixture<IacpaContractControledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IacpaContractControledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IacpaContractControledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
