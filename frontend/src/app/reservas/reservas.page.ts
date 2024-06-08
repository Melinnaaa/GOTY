// pages/reservas/reservas.page.ts

import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  reservas: any[] = [];
  rut: string | null = '';

  constructor(private recursoService: RecursoService) {}

  ngOnInit() {
    this.rut = localStorage.getItem('rut');
    if (this.rut) {
      this.obtenerReservas();
    }
  }

  obtenerReservas() {
    if (this.rut) {
      this.recursoService.obtenerReservasPorEmpleado(this.rut).subscribe(
        (response) => {
          this.reservas = response;
        },
        (error) => {
          console.error('Error al obtener reservas:', error);
        }
      );
    }
  }
}
