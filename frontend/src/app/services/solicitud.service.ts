import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  createSolicitud(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/solicitud`, formData, {headers, withCredentials: true});
  }

  getSolicitudesByUser(rut: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/solicitud/user/${rut}`, {headers, withCredentials: true});
  }

  getSolicitudesNoRespondidas(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/solicitud/no-respondidas`, {headers, withCredentials: true});
  }

  responderSolicitud(id: number, respuesta: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/solicitud/responder/${id}`, {respuesta}, {headers, withCredentials: true} );
  }

  descargarArchivo(id: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/solicitud/descargar/${id}`, { responseType: 'blob', headers, withCredentials: true });
  }

  
}
