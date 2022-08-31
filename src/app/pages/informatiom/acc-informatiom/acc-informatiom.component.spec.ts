import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccInformatiomComponent } from './acc-informatiom.component';

describe('AccInformatiomComponent', () => {
  let component: AccInformatiomComponent;
  let fixture: ComponentFixture<AccInformatiomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccInformatiomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccInformatiomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
