import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from '../interfaces/alert';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
private apiUrl = 'https://localhost:7018/api/alert'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      console.log(token);
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
    }

  addAlert(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(this.apiUrl, alert,{headers:this.getAuthHeaders()});
  }
  deleteAlert(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers:this.getAuthHeaders()});
}
getAllAlerts(): Observable<Alert[]> {
  return this.http.get<Alert[]>(this.apiUrl,{headers:this.getAuthHeaders()});
}
}
