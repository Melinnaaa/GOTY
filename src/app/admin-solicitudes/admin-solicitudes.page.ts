import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../services/solicitud.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-admin-solicitudes',
  templateUrl: './admin-solicitudes.page.html',
  styleUrls: ['./admin-solicitudes.page.scss'],
})
export class AdminSolicitudesPage implements OnInit {
  solicitudes: any[] = [];
  respuesta: string = '';
  solicitudSeleccionada: any = null;

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.obtenerSolicitudesNoRespondidas();
  }

  obtenerSolicitudesNoRespondidas() {
    this.solicitudService.getSolicitudesNoRespondidas().subscribe(
      (response) => {
        this.solicitudes = response;
      },
      (error) => {
        console.error('Error al obtener solicitudes no respondidas:', error);
      }
    );
  }

  seleccionarSolicitud(solicitud: any) {
    this.solicitudSeleccionada = solicitud;
  }

  responderSolicitud() {
    if (this.solicitudSeleccionada && this.respuesta.trim()) {
      this.solicitudService.responderSolicitud(this.solicitudSeleccionada.Id, this.respuesta).subscribe(
        () => {
          alert('Solicitud respondida exitosamente');
          this.obtenerSolicitudesNoRespondidas();
          this.solicitudSeleccionada = null;
          this.respuesta = '';
        },
        (error) => {
          console.error('Error al responder la solicitud:', error);
          alert('Error al responder la solicitud');
        }
      );
    } else {
      alert('Debe seleccionar una solicitud y escribir una respuesta');
    }
  }

  descargarArchivo(id: number) {
    this.solicitudService.descargarArchivo(id).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, 'archivo.pdf');
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
        alert('Error al descargar el archivo');
      }
    );
  }
}
