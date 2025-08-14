import { Component, output, signal } from '@angular/core';
import { PriceSliderComponent } from '../price-slider/price-slider.component';

@Component({
  selector: 'app-filter-column',
  imports: [
    PriceSliderComponent,
  ],
  templateUrl: './filter-column.component.html',
  styleUrl: './filter-column.component.scss'
})
export class FilterColumnComponent {
  
  maxPriceFilter = output<number>();
  minPriceFilter = output<number>();

  newFilter = output<boolean>();
  stockFilter = output<boolean>();
  featuredFilter = output<boolean>();

  filterNew = signal(false);
  filterStock = signal(false);
  filterFeatured = signal(false);


  onFilterByNew(){
    this.filterNew.set(!this.filterNew());
    this.newFilter.emit(this.filterNew());
  }

  onFilterByStock(){
    this.filterStock.set(!this.filterStock());
    this.stockFilter.emit(this.filterStock());
  }

  onFilterByFeatured(){
    this.filterFeatured.set(!this.filterFeatured());
    this.featuredFilter.emit(this.filterFeatured());
  }

  onMinPriceChange(minPrice: number){
    this.minPriceFilter.emit(minPrice);
  }

  onMaxPriceChange(maxPrice: number){
    this.maxPriceFilter.emit(maxPrice);
  }
}
