import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertNationalIdAddComponent } from './convert-national-id-add.component';

describe('ConvertNationalIdAddComponent', () => {
  let component: ConvertNationalIdAddComponent;
  let fixture: ComponentFixture<ConvertNationalIdAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertNationalIdAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertNationalIdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
