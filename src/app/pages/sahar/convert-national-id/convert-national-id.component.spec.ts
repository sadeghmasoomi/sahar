import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertNationalIdComponent } from './convert-national-id.component';

describe('ConvertNationalIdComponent', () => {
  let component: ConvertNationalIdComponent;
  let fixture: ComponentFixture<ConvertNationalIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertNationalIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertNationalIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
