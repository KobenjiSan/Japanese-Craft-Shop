import { Component, input, signal } from '@angular/core';
import { UserResponse } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-admin-user-card',
  imports: [],
  templateUrl: './admin-user-card.component.html',
  styleUrl: './admin-user-card.component.scss'
})
export class AdminUserCardComponent {
  user = input<UserResponse>();

  selected = signal(false);
  onSelect(){
    this.selected.set(!this.selected());
  }
}
