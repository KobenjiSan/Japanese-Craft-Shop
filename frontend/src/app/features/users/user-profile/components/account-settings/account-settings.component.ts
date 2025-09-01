import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  imports: [],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {
  username = input<string>();
  email = input<string>();

  isHoveringImg = signal<boolean>(false);

  setImgHover(toggle: boolean){
    this.isHoveringImg.set(toggle);
  }
}
