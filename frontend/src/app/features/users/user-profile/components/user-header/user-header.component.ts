import { Component, inject, input } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-header',
  imports: [
    RouterLink,
    UpperCasePipe,
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent {
  username = input<string>();

  auth = inject(AuthService);
  router = inject(Router);

  onLogout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
