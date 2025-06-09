import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AdminloginComponent {
  loginForm: FormGroup;
  errorMsg = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AdminService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

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

    this.authService.loginUser(credentials).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        localStorage.setItem('token', res);
        debugger
        this.router.navigate(['/admindashboard']).then(navigated => {
          if (!navigated) {
            console.error('Navigation to admindashboard failed');
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      }
    });
  }
}
  