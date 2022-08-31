import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertNationalIdSetComponent } from './convert-national-id-set.component';

describe('ConvertNationalIdSetComponent', () => {
  let component: ConvertNationalIdSetComponent;
  let fixture: ComponentFixture<ConvertNationalIdSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertNationalIdSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertNationalIdSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
