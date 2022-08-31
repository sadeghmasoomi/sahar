import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcseptProvisionalComponent } from './acsept-provisional.component';

describe('AcseptProvisionalComponent', () => {
  let component: AcseptProvisionalComponent;
  let fixture: ComponentFixture<AcseptProvisionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcseptProvisionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcseptProvisionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
