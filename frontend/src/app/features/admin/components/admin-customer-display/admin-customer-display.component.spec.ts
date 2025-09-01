import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerDisplayComponent } from './admin-customer-display.component';

describe('AdminCustomerDisplayComponent', () => {
  let component: AdminCustomerDisplayComponent;
  let fixture: ComponentFixture<AdminCustomerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCustomerDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCustomerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
