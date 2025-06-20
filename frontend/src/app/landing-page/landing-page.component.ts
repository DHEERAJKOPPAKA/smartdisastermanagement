import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateToAdminLogin() {
    this.router.navigate(['/adminlogin']);
  }

  navigateToUserLogin() {
    this.router.navigate(['/userlogin']);
  }
}
