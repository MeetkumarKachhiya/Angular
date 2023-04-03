import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrayInArrayPackageComponent } from './add-array-in-array-package.component';

describe('AddArrayInArrayPackageComponent', () => {
  let component: AddArrayInArrayPackageComponent;
  let fixture: ComponentFixture<AddArrayInArrayPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArrayInArrayPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArrayInArrayPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
