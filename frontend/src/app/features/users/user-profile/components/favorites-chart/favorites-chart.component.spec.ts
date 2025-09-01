import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesChartComponent } from './favorites-chart.component';

describe('FavoritesChartComponent', () => {
  let component: FavoritesChartComponent;
  let fixture: ComponentFixture<FavoritesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
