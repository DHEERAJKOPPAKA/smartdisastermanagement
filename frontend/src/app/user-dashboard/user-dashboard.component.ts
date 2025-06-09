import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Alert {
  id: number;
  message: string;
  disasterType: string;
  region: string;
  alertTime: string;
}

interface RiskAssessment {
  id: number;
  region: string;
  disasterType: string;
  riskScore: number;
  assessmentDate: string;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  alerts: Alert[] = [];
  riskAssessments: RiskAssessment[] = [];
  currentUser: any;
  isLoading: boolean = true;
  error: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Check authentication
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = JSON.parse(userStr);
    this.loadAlerts();
    this.loadRiskAssessments();
  }

  private loadAlerts() {
    fetch('/api/Alert')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch alerts');
        return response.json();
      })
      .then(data => {
        this.alerts = data.filter((alert: Alert) => 
          alert.region === this.currentUser.region
        );
      })
      .catch(error => {
        console.error('Error loading alerts:', error);
        this.error = 'Failed to load alerts';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  private loadRiskAssessments() {
    fetch('/api/RiskAssessment')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch risk assessments');
        return response.json();
      })
      .then(data => {
        this.riskAssessments = data.filter((assessment: RiskAssessment) => 
          assessment.region === this.currentUser.region
        );
      })
      .catch(error => {
        console.error('Error loading risk assessments:', error);
        this.error = 'Failed to load risk assessments';
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  getRiskLevel(score: number): string {
    if (score >= 0.7) return 'High';
    if (score >= 0.4) return 'Medium';
    return 'Low';
  }

  getRiskColor(score: number): string {
    if (score >= 0.7) return 'risk-high';
    if (score >= 0.4) return 'risk-medium';
    return 'risk-low';
  }
  goBack(){
    window.history.back();
  }

}