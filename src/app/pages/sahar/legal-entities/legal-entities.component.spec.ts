import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEntitiesComponent } from './legal-entities.component';

describe('LegalEntitiesComponent', () => {
  let component: LegalEntitiesComponent;
  let fixture: ComponentFixture<LegalEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
