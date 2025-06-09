import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule,RouterModule,HttpClientModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validate required & email format
      password: ['', [Validators.required]],
    });

    // Clear error message on form value changes
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMsg = '';
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    this.errorMsg = 'Please enter a valid email and password.';
    return;
  }

  const credentials = this.loginForm.value;
  this.isLoading = true;
  this.errorMsg = '';

  console.log('Sending credentials:', credentials);

  this.authService.loginUser(credentials).subscribe({
    next: (res: any) => {
      this.isLoading = false;
      console.log('Login success:', res);
      localStorage.setItem('token', res);
      console.log(localStorage.getItem('token'))

      this.router.navigate(['/userdashboard']).then(navigated => {
        if (navigated) {
          console.log('Navigation to user-dashboard succeeded');
        } else {
          console.error('Navigation to user-dashboard failed');
        }
      });
    },
    error: (err:any) => {
      this.isLoading = false;
      this.errorMsg = 'Login failed. Please check your credentials.';
      console.error('Login error:', err);
    }
  });
}

}

