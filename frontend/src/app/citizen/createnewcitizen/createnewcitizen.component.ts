import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Citizen } from '../../interfaces/citizen';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createnewcitizen',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './createnewcitizen.component.html',
  styleUrl: './createnewcitizen.component.css'
})
export class CreatenewcitizenComponent {
user: Citizen = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    region: ''
  };

  successMessage = '';
  errorMessage = '';
  loading = false;
    constructor(private userService: UserService) {}
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
