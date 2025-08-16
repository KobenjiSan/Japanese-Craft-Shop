import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListDisplayComponent } from './product-list-display.component';

describe('ProductListDisplayComponent', () => {
  let component: ProductListDisplayComponent;
  let fixture: ComponentFixture<ProductListDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
