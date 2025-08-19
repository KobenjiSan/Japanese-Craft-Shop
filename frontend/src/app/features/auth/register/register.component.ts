import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  toastr = inject(ToastrService);
  

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      this.toastr.error('Registration fields cannot be blank.');
      return;
    }

    const { username, email, password} = this.registerForm.value;

    this.auth.register(username!, email!, password!).subscribe({
      next: () => {
        this.toastr.success('Registration Successful!')
        this.router.navigate(['/login']);
      },
      error: (err) => {console.error(err);}
    });
  }
}
