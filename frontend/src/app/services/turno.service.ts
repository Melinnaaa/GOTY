import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  generarHorario(mes: number, ano: number, forzar: boolean = false): Observable<any> {
    return this.http.post(`${this.apiUrl}/turno/generar`, { mes, ano, forzar });
  }

  obtenerHorarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/turno/obtener`);
  }

  obtenerTurnosPorFecha(fecha: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/turno/obtenerPorFecha/${fecha}`);
  }

  obtenerTodosLosEmpleados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/turno/obtenerEmpleados`);
  }

  actualizarTurnos(fecha: string, turnos: any[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/turno/actualizar/${fecha}`, { turnos });
  }
}
