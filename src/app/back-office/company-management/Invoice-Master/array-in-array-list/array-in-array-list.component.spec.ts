import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayInArrayListComponent } from './array-in-array-list.component';

describe('ArrayInArrayListComponent', () => {
  let component: ArrayInArrayListComponent;
  let fixture: ComponentFixture<ArrayInArrayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayInArrayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayInArrayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
