import { Component, signal } from '@angular/core';
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

  filterNew = signal(false);
  filterStock = signal(false);
  filterFeatured = signal(false);


  onFilterByNew(){
    this.filterNew.set(!this.filterNew());
  }

  onFilterByStock(){
    this.filterStock.set(!this.filterStock());
  }

  onFilterByFeatured(){
    this.filterFeatured.set(!this.filterFeatured())
  }

  onMinPriceChange(minPrice: number){
    console.log('Min price', minPrice);
  }

  onMaxPriceChange(maxPrice: number){
    console.log('Max price', maxPrice);
  }
}
