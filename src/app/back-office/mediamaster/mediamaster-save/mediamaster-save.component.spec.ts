import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaMasterSaveComponent } from './mediamaster-save.component';

describe('MediaMasterSaveComponent', () => {
  let component: MediaMasterSaveComponent;
  let fixture: ComponentFixture<MediaMasterSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaMasterSaveComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MediaMasterSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
