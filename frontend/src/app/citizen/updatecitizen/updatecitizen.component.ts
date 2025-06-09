import { Component, OnInit } from '@angular/core';
import { Citizen } from '../../interfaces/citizen';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatecitizen',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './updatecitizen.component.html',
  styleUrl: './updatecitizen.component.css'
})
export class UpdatecitizenComponent implements OnInit{

  constructor(
      private userService: UserService,
      private route:ActivatedRoute
    ){}
  userId!: number;
  user: Citizen = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    region: ''
  };

  loading = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser(this.userId);
  }

  loadUser(id: number) {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load user data.';
        this.loading = false;
      }
    });
  }

  updateUser() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.updateUser(this.userId, this.user).subscribe({
      next: (res) => {
        this.successMessage = 'User updated successfully!';
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to update user.';
        this.loading = false;
      }
    });
  }
}
