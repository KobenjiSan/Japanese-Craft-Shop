import { Component, input } from '@angular/core';
import { UserToId } from '../../../../shared/models/liked-by-user.model';

@Component({
  selector: 'app-liked-by-list-card',
  imports: [],
  templateUrl: './liked-by-list-card.component.html',
  styleUrl: './liked-by-list-card.component.scss'
})
export class LikedByListCardComponent {
  user = input<UserToId>();
}
