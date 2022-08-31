import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInformatiomComponent } from './add-informatiom.component';

describe('AddInformatiomComponent', () => {
  let component: AddInformatiomComponent;
  let fixture: ComponentFixture<AddInformatiomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInformatiomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInformatiomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
