import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGovFormInfoComponent } from './update-gov-form-info.component';

describe('UpdateGovFormInfoComponent', () => {
  let component: UpdateGovFormInfoComponent;
  let fixture: ComponentFixture<UpdateGovFormInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGovFormInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGovFormInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
