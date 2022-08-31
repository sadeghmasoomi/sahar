import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorIncomAddFile169Component } from './auditor-incom-add-file169.component';

describe('AuditorIncomAddFile169Component', () => {
  let component: AuditorIncomAddFile169Component;
  let fixture: ComponentFixture<AuditorIncomAddFile169Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorIncomAddFile169Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorIncomAddFile169Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
