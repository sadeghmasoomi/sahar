import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmActivitionComponent } from './firm-activition.component';

describe('FirmActivitionComponent', () => {
  let component: FirmActivitionComponent;
  let fixture: ComponentFixture<FirmActivitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmActivitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmActivitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
