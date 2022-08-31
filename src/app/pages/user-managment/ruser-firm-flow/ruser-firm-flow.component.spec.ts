import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RUserFirmFlowComponent } from './ruser-firm-flow.component';

describe('RUserFirmFlowComponent', () => {
  let component: RUserFirmFlowComponent;
  let fixture: ComponentFixture<RUserFirmFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RUserFirmFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RUserFirmFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
