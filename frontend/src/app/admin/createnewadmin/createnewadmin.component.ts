import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../interfaces/admin';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createnewadmin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './createnewadmin.component.html',
  styleUrl: './createnewadmin.component.css'
})
export class CreatenewadminComponent {
  user: Admin = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    region: ''
  };

  successMessage = '';
  errorMessage = '';
  loading = false; // ✅ FIXED

  constructor(private userService: AdminService) {}

  createUser() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.createUser(this.user).subscribe({
      next: (res) => {
        this.successMessage = `User ${res.fullName} created successfully!`;
        this.loading = false;
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage = 'Failed to create user.';
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.user = {
      id: 0,
      fullName: '',
      email: '',
      password: '',
      region: ''
    };
  }
}
