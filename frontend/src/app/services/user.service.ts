import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string;
  private apiUrl: string;
  constructor(private http: HttpClient) { 
    this.userUrl = environment.endpoint;
    this.apiUrl = 'http://localhost:3000/api/signup'
  }

  saveUser(user: User, captchaToken: string): Observable<any> {
    const requestBody = { ...user, captchaToken };
    return this.http.post(`${this.apiUrl}`, requestBody);
  }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>('http://localhost:3000/api/admin', { headers, withCredentials: true});
  }

  getUserById(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`http://localhost:3000/api/admin/${userId}`, { headers, withCredentials: true});
  }

  deleteUserById(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<User[]>(`http://localhost:3000/api/admin/${userId}`, { headers, withCredentials: true});
  }

  updateUserById(userId: string, user: User): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<User[]>(`http://localhost:3000/api/admin/${userId}`, user, { headers, withCredentials: true});
  }

  crearAdmin(admin: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://localhost:3000/api/admin/crear-admin`, admin, { headers, withCredentials: true});
  }
}
