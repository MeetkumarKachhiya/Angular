import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrayInArraySavanListComponent } from './add-array-in-array-savan-list.component';

describe('AddArrayInArraySavanListComponent', () => {
  let component: AddArrayInArraySavanListComponent;
  let fixture: ComponentFixture<AddArrayInArraySavanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArrayInArraySavanListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArrayInArraySavanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
