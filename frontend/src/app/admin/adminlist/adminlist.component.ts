import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../interfaces/admin';

@Component({
  selector: 'app-adminlist',
  standalone: true,
  imports: [],
  templateUrl: './adminlist.component.html',
  styleUrl: './adminlist.component.css'
})
export class AdminlistComponent implements OnInit{
users: Admin[] = [];
  loading = true;
  error = '';

  constructor(private userService: AdminService) {}

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
