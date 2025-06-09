import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface AlertDto {
  id: number;
  citizenId: number;
  message: string;
  disasterType: string;
  region: string;
  alertTime: string;
}

@Component({
  selector: 'app-emergency-alerts',
  templateUrl: './emergency-alerts.component.html',
  styleUrls: ['./emergency-alerts.component.css'],
  standalone:true,
  imports:[FormsModule,RouterModule,CommonModule]
})
export class EmergencyAlertsComponent implements OnInit {
  alerts: AlertDto[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAlerts();
  }

  fetchAlerts(): void {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found. Please login again.');
    return;
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  this.http.get<AlertDto[]>('https://localhost:7018/api/alert', headers).subscribe({
    next: (data) => {
      this.alerts = data;
    },
    error: (err) => {
      console.error('Error fetching alerts:', err);
    }
  });
}
goBack(){
  window.history.back();
}
}
