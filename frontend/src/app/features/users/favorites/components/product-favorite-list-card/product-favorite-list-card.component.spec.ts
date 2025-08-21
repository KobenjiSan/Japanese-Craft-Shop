import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFavoriteListCardComponent } from './product-favorite-list-card.component';

describe('ProductFavoriteListCardComponent', () => {
  let component: ProductFavoriteListCardComponent;
  let fixture: ComponentFixture<ProductFavoriteListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFavoriteListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFavoriteListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
