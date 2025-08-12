import { Component, computed, output, signal } from '@angular/core';

@Component({
  selector: 'app-price-slider',
  imports: [],
  templateUrl: './price-slider.component.html',
  styleUrl: './price-slider.component.scss'
})
export class PriceSliderComponent {
  readonly min = 0;
  readonly max = 150;
  readonly gap = 5;

  low = signal<number>(this.min);
  high = signal<number>(this.max);

  readonly lowPrice = computed(() => this.low());
  readonly highPrice = computed(() => this.high());

  minPrice = output<number>();
  maxPrice = output<number>();

  onLowChange(event: Event){
    let value = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(value)) value = this.min;

    // clamp to [min, high-gap]
    const upper = Math.max(this.min, this.high() - this.gap);
    const clamped = Math.min(Math.max(value, this.min), upper);
    this.low.set(clamped);

    this.minPrice.emit(this.low());
  }

  onHighChange(event: Event){
    let value = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(value)) value = this.max;

    // clamp to [low+gap, max]
    const lower = Math.min(this.max, this.low() + this.gap);
    const clamped = Math.max(Math.min(value, this.max), lower);
    this.high.set(clamped);

    this.maxPrice.emit(this.high());
  }
}
