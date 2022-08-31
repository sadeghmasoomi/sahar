import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoTotalPositionComponent } from './co-total-position.component';

describe('CoTotalPositionComponent', () => {
  let component: CoTotalPositionComponent;
  let fixture: ComponentFixture<CoTotalPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoTotalPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoTotalPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
