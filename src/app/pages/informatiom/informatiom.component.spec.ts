import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformatiomComponent } from './informatiom.component';

describe('InformatiomComponent', () => {
  let component: InformatiomComponent;
  let fixture: ComponentFixture<InformatiomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformatiomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformatiomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
