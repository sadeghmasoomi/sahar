import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovFirmInfoComponent } from './gov-firm-info.component';

describe('GovFirmInfoComponent', () => {
  let component: GovFirmInfoComponent;
  let fixture: ComponentFixture<GovFirmInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovFirmInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovFirmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
