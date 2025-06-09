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
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  alerts: Alert[] = [];
  riskAssessments: RiskAssessment[] = [];
  currentAdmin: any;
  isLoading: boolean = true;
  error: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const adminStr = localStorage.getItem('currentUser');
    if (!adminStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentAdmin = JSON.parse(adminStr);
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
        this.alerts = data;
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
        this.riskAssessments = data;
      })
      .catch(error => {
        console.error('Error loading risk assessments:', error);
        this.error = 'Failed to load risk assessments';
      });
  }

  getHighRiskCount(): number {
    return this.riskAssessments.filter(r => r.riskScore >= 0.7).length;
  }

  getAlertClass(disasterType: string): string {
    return disasterType === 'Severe' ? 'alert-danger' : 'alert-warning';
  }

  getRiskCardClass(score: number): any {
    return {
      'border-danger': score >= 0.7,
      'border-warning': score >= 0.4 && score < 0.7,
      'border-success': score < 0.4
    };
  }

  getRiskProgressClass(score: number): any {
    return {
      'bg-danger': score >= 0.7,
      'bg-warning': score >= 0.4 && score < 0.7,
      'bg-success': score < 0.4
    };
  }

  formatRiskScore(score: number): string {
    return (score * 100).toFixed(1);
  }

  getRiskLevel(score: number): string {
    if (score >= 0.7) return 'High';
    if (score >= 0.4) return 'Medium';
    return 'Low';
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    this.router.navigate(['/adminlogin']);
  }
}
