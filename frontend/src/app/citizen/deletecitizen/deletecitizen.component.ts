import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Citizen } from '../../interfaces/citizen';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deletecitizen',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './deletecitizen.component.html',
  styleUrl: './deletecitizen.component.css'
})
export class DeletecitizenComponent implements OnInit{
users: Citizen[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  constructor(
       private userService: UserService
     ){}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getallUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users.';
        this.loading = false;
      }
    });
  }

  deleteUser(id: number) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    this.loading = true;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.successMessage = 'User deleted successfully.';
        this.loadUsers(); // Refresh list
      },
      error: () => {
        this.errorMessage = 'Failed to delete user.';
        this.loading = false;
      }
    });
  }
}
