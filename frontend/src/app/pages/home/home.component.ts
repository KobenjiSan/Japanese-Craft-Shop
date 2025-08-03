import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedDisplayComponent } from '../../features/products/featured-display/featured-display.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    FeaturedDisplayComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
