import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewNewsComponent } from './add-new-news.component';

describe('AddNewNewsComponent', () => {
  let component: AddNewNewsComponent;
  let fixture: ComponentFixture<AddNewNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
