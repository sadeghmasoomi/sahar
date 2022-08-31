import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorIncomAddDetialComponent } from './auditor-incom-add-detial.component';

describe('AuditorIncomAddDetialComponent', () => {
  let component: AuditorIncomAddDetialComponent;
  let fixture: ComponentFixture<AuditorIncomAddDetialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorIncomAddDetialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorIncomAddDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
