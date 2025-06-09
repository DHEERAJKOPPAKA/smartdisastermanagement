import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from '../../services/alerts.service';
import { Alert } from '../../interfaces/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-declarealert',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './declarealert.component.html',
  styleUrl: './declarealert.component.css'
})
export class DeclarealertComponent {
alertForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService
  ) {
    this.alertForm = this.fb.group({
      citizenId: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(300)]],
      disasterType: ['', Validators.required],
      region: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.alertForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const newAlert: Alert = {
      id: 0, // backend will assign the ID
      citizenId: this.alertForm.value.citizenId,
      message: this.alertForm.value.message,
      disasterType: this.alertForm.value.disasterType,
      region: this.alertForm.value.region,
      alertTime: new Date().toISOString()
    };

    this.alertsService.addAlert(newAlert).subscribe({
      next: () => {
        this.successMessage = 'Alert submitted successfully!';
        this.alertForm.reset();
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit alert.';
        console.error(err);
      }
    });
  }
}

