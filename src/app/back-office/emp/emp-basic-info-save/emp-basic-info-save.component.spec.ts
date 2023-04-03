import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBasicInfoSaveComponent } from './emp-basic-info-save.component';

describe('EmpBasicInfoSaveComponent', () => {
  let component: EmpBasicInfoSaveComponent;
  let fixture: ComponentFixture<EmpBasicInfoSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBasicInfoSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpBasicInfoSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
