import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  router = inject(Router);
  auth = inject(AuthService);
  fb = inject(FormBuilder);
  

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if(this.registerForm.invalid){
      // TODO add UX validations later
      return;
    }

    const { username, email, password} = this.registerForm.value;

    this.auth.register(username!, email!, password!).subscribe({
      next: () => {
        // TODO add toaster success message
        this.router.navigate(['/login']);
      },
      error: (err) => {console.error(err);}
    });
  }
}
