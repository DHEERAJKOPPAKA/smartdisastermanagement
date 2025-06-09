import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loginrequest } from '../interfaces/loginrequest';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private url='https://localhost:7018/api/Admin';
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
 getallUsers(): Observable<Admin[]> {
    console.log
    return this.http.get<Admin[]>(this.url, { headers: this.getAuthHeaders() });
  }
  getUserById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }
  createUser(user: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.url, user, { headers: this.getAuthHeaders() });
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
}
