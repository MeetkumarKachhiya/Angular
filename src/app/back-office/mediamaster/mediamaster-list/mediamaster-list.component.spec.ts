import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaMasterListComponent } from './mediamaster-list.component';

describe('MediaMasterListComponent', () => {
  let component: MediaMasterListComponent;
  let fixture: ComponentFixture<MediaMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaMasterListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MediaMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
