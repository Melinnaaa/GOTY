import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  nombre: string | null = '';
  rut: string | null = '';
  fecha: string = '';
  motivo: string = '';
  descripcion: string = '';
  archivos: File[] = [];

  constructor(private router: Router, private solicitudService: SolicitudService) {}

  ngOnInit() {
    // Simulación de datos del usuario (en una aplicación real, estos datos vendrían de un servicio de autenticación)
    this.nombre = localStorage.getItem('userName');
    this.rut = localStorage.getItem('rut');
    this.fecha = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.archivos = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Verificar si el archivo es PDF
      if (file.type === 'application/pdf' && file.name.endsWith('.pdf')) {
        this.archivos.push(file);
      } else {
        alert(`El archivo ${file.name} no es un PDF.`);
      }
    }
  }

  realizarSolicitud() {
    const formData = new FormData();
    formData.append('nombre', this.nombre || '');
    formData.append('rut', this.rut || '');
    formData.append('fecha', this.fecha);
    formData.append('motivo', this.motivo);
    formData.append('descripcion', this.descripcion);
    this.archivos.forEach(file => {
      formData.append('archivo', file, file.name);
    });

    // Logging para verificar los datos enviados
    console.log('Nombre:', this.nombre);
    console.log('Rut:', this.rut);
    console.log('Fecha:', this.fecha);
    console.log('Motivo:', this.motivo);
    console.log('Descripcion:', this.descripcion);
    console.log('Archivos:', this.archivos);

    // Iterar sobre el FormData para verificar su contenido
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.solicitudService.createSolicitud(formData).subscribe(
      response => {
        console.log('Solicitud enviada exitosamente');
        alert('Solicitud enviada exitosamente');
        this.router.navigate(['/principal']); // Redirige a la página de inicio después de enviar la solicitud
      },
      error => {
        console.error('Error al enviar la solicitud', error);
        alert('Error al enviar la solicitud');
      }
    );
  }
}
