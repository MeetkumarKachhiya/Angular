import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrayInArrayPackageListComponent } from './add-array-in-array-package-list.component';

describe('AddArrayInArrayPackageListComponent', () => {
  let component: AddArrayInArrayPackageListComponent;
  let fixture: ComponentFixture<AddArrayInArrayPackageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddArrayInArrayPackageListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddArrayInArrayPackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
