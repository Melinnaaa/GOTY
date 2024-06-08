import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  reservarRecurso(idRecurso: number, rut: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  
    return this.http.post(`${this.apiUrl}/recurso/reservar/${idRecurso}`, { rut }, {headers, withCredentials: true});
  }

  obtenerRecursosDisponibles(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get(`${this.apiUrl}/recurso/disponibles`, {headers, withCredentials: true});
  }

  obtenerRecursosNoDisponibles(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get(`${this.apiUrl}/recurso/noDisponibles`, {headers, withCredentials: true});
  }

  liberarRecursoManualmente(idRecurso: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.put(`${this.apiUrl}/recurso/liberar/${idRecurso}`, {}, {headers, withCredentials: true});
  }

  obtenerReservasPorEmpleado(rut: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get(`${this.apiUrl}/recurso/reservas/${rut}`, {headers, withCredentials: true});
  }
}
