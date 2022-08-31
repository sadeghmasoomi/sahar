import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirmAuditorComponent } from './add-firm-auditor.component';

describe('AddFirmAuditorComponent', () => {
  let component: AddFirmAuditorComponent;
  let fixture: ComponentFixture<AddFirmAuditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFirmAuditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFirmAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
