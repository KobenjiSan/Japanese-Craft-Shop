import { Component, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [
    RouterLink
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  auth = inject(AuthService);
  router = inject(Router);

  username = this.auth.getUsername();

  onLogout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

  toDashboard(){
    this.router.navigate(['/admin']); 
  }
}
