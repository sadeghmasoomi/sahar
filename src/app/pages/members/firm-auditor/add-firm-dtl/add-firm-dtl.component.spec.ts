import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirmDtlComponent } from './add-firm-dtl.component';

describe('AddFirmDtlComponent', () => {
  let component: AddFirmDtlComponent;
  let fixture: ComponentFixture<AddFirmDtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFirmDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFirmDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
