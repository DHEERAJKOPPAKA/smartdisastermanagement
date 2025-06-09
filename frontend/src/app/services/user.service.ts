import { Injectable } from '@angular/core';
import { Loginrequest } from '../interfaces/loginrequest';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Citizen } from '../interfaces/citizen';
import { Alert } from '../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url='https://localhost:7018/api/Citizen';
  constructor(private http:HttpClient){}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

 loginUser(request: Loginrequest): Observable<string> {
  return this.http.post(`${this.url}/login`, request, {
    responseType: 'text'  // 👈 This is important
  });
}
 getallUsers(): Observable<Citizen[]> {
    console.log
    return this.http.get<Citizen[]>(this.url, { headers: this.getAuthHeaders() });
  }
  getUserById(id: number): Observable<Citizen> {
    return this.http.get<Citizen>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }
  createUser(user: Citizen): Observable<Citizen> {
    return this.http.post<Citizen>(this.url, user, { headers: this.getAuthHeaders() });
  }
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, user, {
      headers:this.getAuthHeaders(),
    responseType: 'text' as 'json'
  });
 }
 deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders(),responseType: 'text' as 'json' });
  }
  getAlertsByCitizenId(citizenId: number): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.url}/by-citizen/${citizenId}`);
  }

}


