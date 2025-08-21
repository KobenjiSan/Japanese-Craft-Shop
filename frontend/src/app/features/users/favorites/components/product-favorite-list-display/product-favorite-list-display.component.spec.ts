import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFavoriteListDisplayComponent } from './product-favorite-list-display.component';

describe('ProductFavoriteListDisplayComponent', () => {
  let component: ProductFavoriteListDisplayComponent;
  let fixture: ComponentFixture<ProductFavoriteListDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFavoriteListDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFavoriteListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
