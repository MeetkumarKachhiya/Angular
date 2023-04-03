import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrayInArraySavanComponent } from './add-array-in-array-savan.component';

describe('AddArrayInArraySavanComponent', () => {
  let component: AddArrayInArraySavanComponent;
  let fixture: ComponentFixture<AddArrayInArraySavanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArrayInArraySavanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArrayInArraySavanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
