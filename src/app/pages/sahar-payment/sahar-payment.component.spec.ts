import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaharPaymentComponent } from './sahar-payment.component';

describe('SaharPaymentComponent', () => {
  let component: SaharPaymentComponent;
  let fixture: ComponentFixture<SaharPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaharPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaharPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
