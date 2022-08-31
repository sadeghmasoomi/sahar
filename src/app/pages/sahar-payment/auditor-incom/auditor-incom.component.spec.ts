import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorIncomComponent } from './auditor-incom.component';

describe('AuditorIncomComponent', () => {
  let component: AuditorIncomComponent;
  let fixture: ComponentFixture<AuditorIncomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorIncomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorIncomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
