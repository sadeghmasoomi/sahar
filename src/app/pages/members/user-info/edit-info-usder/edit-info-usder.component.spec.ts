import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoUsderComponent } from './edit-info-usder.component';

describe('EditInfoUsderComponent', () => {
  let component: EditInfoUsderComponent;
  let fixture: ComponentFixture<EditInfoUsderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfoUsderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoUsderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
