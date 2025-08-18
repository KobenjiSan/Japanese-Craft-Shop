import { Component, input } from '@angular/core';

@Component({
  selector: 'app-liked-by-list-card',
  imports: [],
  templateUrl: './liked-by-list-card.component.html',
  styleUrl: './liked-by-list-card.component.scss'
})
export class LikedByListCardComponent {
  userId = input<string>();
}
