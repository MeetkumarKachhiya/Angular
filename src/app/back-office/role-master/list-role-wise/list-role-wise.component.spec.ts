import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoleWiseComponent } from './list-role-wise.component';

describe('ListRoleWiseComponent', () => {
  let component: ListRoleWiseComponent;
  let fixture: ComponentFixture<ListRoleWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRoleWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRoleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
