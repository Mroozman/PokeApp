import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityDetailsComponent } from './ability-details.component';

describe('AbilityDetailsComponent', () => {
  let component: AbilityDetailsComponent;
  let fixture: ComponentFixture<AbilityDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilityDetailsComponent]
    });
    fixture = TestBed.createComponent(AbilityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
