import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRoleWiseComponent } from './save-role-wise.component';

describe('SaveRoleWiseComponent', () => {
  let component: SaveRoleWiseComponent;
  let fixture: ComponentFixture<SaveRoleWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveRoleWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveRoleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
