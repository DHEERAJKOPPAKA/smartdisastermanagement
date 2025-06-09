import { Component } from '@angular/core';
import { Alert } from '../../interfaces/alert';
import { AlertsService } from '../../services/alerts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deletealert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deletealert.component.html',
  styleUrl: './deletealert.component.css'
})
export class DeletealertComponent {
 alerts: Alert[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.getAlerts();
  }

  getAlerts(): void {
    this.alertsService.getAllAlerts().subscribe({
      next: (data) => {
        this.alerts = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load alerts';
        console.error(err);
      }
    });
  }

  deleteAlert(id: number): void {
    if (!confirm('Are you sure you want to delete this alert?')) return;

    this.alertsService.deleteAlert(id).subscribe({
      next: () => {
        this.successMessage = 'Alert deleted successfully!';
        this.getAlerts(); // Refresh the list
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete alert.';
        console.error(err);
      }
    });
  }
}
