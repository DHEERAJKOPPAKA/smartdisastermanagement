import { Component } from '@angular/core';
import { Alert } from '../interfaces/alert';
import { AlertsService } from '../services/alerts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-viewalerts',
  standalone: true,
  imports: [],
  templateUrl: './viewalerts.component.html',
  styleUrl: './viewalerts.component.css'
})
export class ViewalertsComponent {
citizenId!: number;
  alerts: Alert[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(private alertsService: UserService) {}

  fetchAlerts(): void {
    if (!this.citizenId) {
      this.errorMessage = 'Please enter a valid Citizen ID.';
      this.alerts = [];
      return;
    }

    this.alertsService.getAlertsByCitizenId(this.citizenId).subscribe({
      next: (data) => {
        this.alerts = data;
        this.errorMessage = '';
        this.successMessage = `Found ${data.length} alert(s) for Citizen ID ${this.citizenId}.`;
      },
      error: (err) => {
        this.alerts = [];
        this.successMessage = '';
        this.errorMessage = 'Failed to fetch alerts.';
        console.error(err);
      }
    });
  }
}
