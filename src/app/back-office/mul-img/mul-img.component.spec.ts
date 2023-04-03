import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulIMGComponent } from './mul-img.component';

describe('MulIMGComponent', () => {
  let component: MulIMGComponent;
  let fixture: ComponentFixture<MulIMGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MulIMGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MulIMGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
