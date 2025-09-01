import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettingsDisplayComponent } from './admin-settings-display.component';

describe('AdminSettingsDisplayComponent', () => {
  let component: AdminSettingsDisplayComponent;
  let fixture: ComponentFixture<AdminSettingsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSettingsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSettingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
