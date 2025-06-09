import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../../interfaces/admin';

@Component({
  selector: 'app-adminbyid',
  standalone: true,
  imports: [],
  templateUrl: './adminbyid.component.html',
  styleUrl: './adminbyid.component.css'
})
export class AdminbyidComponent {
user: Admin | null = null;
  loading = true;
  error: string | null = null;
 constructor(
     private userService: AdminService,
     private route:ActivatedRoute
   ){}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (data) => {
          this.user = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load user.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Invalid user ID.';
      this.loading = false;
    }
  }
}
