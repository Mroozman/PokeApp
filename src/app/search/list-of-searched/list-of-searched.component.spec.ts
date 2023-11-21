import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSearchedComponent } from './list-of-searched.component';

describe('ListOfSearchedComponent', () => {
  let component: ListOfSearchedComponent;
  let fixture: ComponentFixture<ListOfSearchedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfSearchedComponent]
    });
    fixture = TestBed.createComponent(ListOfSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
