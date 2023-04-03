import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrayInArrayComponent } from './add-array-in-array.component';

describe('AddArrayInArrayComponent', () => {
  let component: AddArrayInArrayComponent;
  let fixture: ComponentFixture<AddArrayInArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArrayInArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArrayInArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
