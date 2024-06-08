import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-ver-solicitudes',
  templateUrl: './ver-solicitudes.page.html',
  styleUrls: ['./ver-solicitudes.page.scss'],
})
export class VerSolicitudesPage implements OnInit {
  solicitudes: any[] = [];
  rut: string | null = '';

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.rut = localStorage.getItem('rut');
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    if (this.rut) {
      this.solicitudService.getSolicitudesByUser(this.rut).subscribe(
        (response) => {
          this.solicitudes = response;
        },
        (error) => {
          console.error('Error al obtener solicitudes:', error);
        }
      );
    }
  }
}
