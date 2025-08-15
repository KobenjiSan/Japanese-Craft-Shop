import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductDisplayComponent } from './admin-product-display.component';

describe('AdminProductDisplayComponent', () => {
  let component: AdminProductDisplayComponent;
  let fixture: ComponentFixture<AdminProductDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
