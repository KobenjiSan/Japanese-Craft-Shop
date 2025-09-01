import { Component, computed, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { Product } from '../../../../../shared/models/product.model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-favorites-chart',
  imports: [],
  templateUrl: './favorites-chart.component.html',
  styleUrl: './favorites-chart.component.scss'
})
export class FavoritesChartComponent {
  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  products = input<Product[]>();

  categories = computed(() => {
  const items = this.products();

  return [
    {
      name: 'Pottery',
      count: items!.filter(p => p.category === 'Pottery').length,
    },
    {
      name: 'Textile',
      count: items!.filter(p => p.category === 'Textile').length,
    },
    {
      name: 'Wood Craft',
      count: items!.filter(p => p.category === 'Wood Craft').length,
    },
    {
      name: 'Paper Craft',
      count: items!.filter(p => p.category === 'Paper Craft').length,
    },
    {
      name: 'Metalwork',
      count: items!.filter(p => p.category === 'Metalwork').length,
    },
    {
      name: 'Arts',
      count: items!.filter(p => p.category === 'Arts').length,
    },
  ];
});

  private chart!: Chart;

  readonly loadChartEffect = effect(() => {
      const el = this.chartCanvas()?.nativeElement;
      const cats = this.categories();

      if (!el || cats.length === 0) return;

      // destroy previous chart before re-creating
      this.chart?.destroy();

      this.chart = new Chart(el, {
        type: 'pie',
        data: {
          labels: cats.map(c => c.name),
          datasets: [
            {
              data: cats.map(c => c.count),
              backgroundColor: [
                '#3E2E24', 
                '#5D473A', 
                '#D8C3A5', 
                '#AE9A7F', 
                '#80614E', 
                '#E3D3BC',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      });
    });
}
