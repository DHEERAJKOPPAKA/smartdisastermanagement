import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Citizen } from '../../interfaces/citizen';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citizenlist',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './citizenlist.component.html',
  styleUrl: './citizenlist.component.css'
})
export class CitizenlistComponent {
 users: Citizen[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getallUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
