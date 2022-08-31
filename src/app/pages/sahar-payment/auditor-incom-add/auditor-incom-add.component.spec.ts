import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorIncomAddComponent } from './auditor-incom-add.component';

describe('AuditorIncomAddComponent', () => {
  let component: AuditorIncomAddComponent;
  let fixture: ComponentFixture<AuditorIncomAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorIncomAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorIncomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
