import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreateDisplayComponent } from './product-create-display.component';

describe('ProductCreateDisplayComponent', () => {
  let component: ProductCreateDisplayComponent;
  let fixture: ComponentFixture<ProductCreateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCreateDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCreateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
