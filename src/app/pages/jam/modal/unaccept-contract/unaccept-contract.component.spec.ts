import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnacceptContractComponent } from './unaccept-contract.component';

describe('UnacceptContractComponent', () => {
  let component: UnacceptContractComponent;
  let fixture: ComponentFixture<UnacceptContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnacceptContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnacceptContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
