import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserHeaderComponent } from '../components/user-header/user-header.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';

@Component({
  selector: 'app-user-profile-display',
  imports: [
    UserHeaderComponent,
    AccountSettingsComponent,
  ],
  templateUrl: './user-profile-display.component.html',
  styleUrl: './user-profile-display.component.scss'
})
export class UserProfileDisplayComponent {
  auth = inject(AuthService);

  username = this.auth.getUsername();

}
