import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  auth = inject(AuthService);
  fb = inject(FormBuilder);
  

  loginForm = this.fb.group({
    identifier: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(){
    if(this.loginForm.invalid){
      // TODO add UX validations later
      return;
    }

    const { identifier, password} = this.loginForm.value;

    this.auth.login(identifier!, password!).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        // TODO: do something with res.expiresAt
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
        // TODO: show user-facing error later
      }
    });
  }

}
