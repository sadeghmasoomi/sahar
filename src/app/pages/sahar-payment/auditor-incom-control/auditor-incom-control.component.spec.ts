import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorIncomControlComponent } from './auditor-incom-control.component';

describe('AuditorIncomControlComponent', () => {
  let component: AuditorIncomControlComponent;
  let fixture: ComponentFixture<AuditorIncomControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorIncomControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorIncomControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
