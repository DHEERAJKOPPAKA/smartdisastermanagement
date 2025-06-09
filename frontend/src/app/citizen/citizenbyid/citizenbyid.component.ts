import { Component, OnInit } from '@angular/core';
import { Citizen } from '../../interfaces/citizen';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-citizenbyid',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './citizenbyid.component.html',
  styleUrl: './citizenbyid.component.css'
})
export class CitizenbyidComponent implements OnInit{
user: Citizen | null = null;
  loading = true;
  error: string | null = null;
  
 constructor(
     private userService: UserService,
     private route:ActivatedRoute
   ){}
  ngOnInit() {
  this.route.params.subscribe(params => {
    const id = Number(params['id']);

    // Reset state to show loading again
    this.user = null;
    this.loading = true;
    this.error = null;

    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (data) => {
          this.user = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load user.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Invalid user ID.';
      this.loading = false;
    }
  });
}


}
