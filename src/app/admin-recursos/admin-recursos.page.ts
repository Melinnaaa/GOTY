import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-admin-recursos',
  templateUrl: './admin-recursos.page.html',
  styleUrls: ['./admin-recursos.page.scss'],
})
export class AdminRecursosPage implements OnInit {
  recursosNoDisponibles: any[] = [];

  constructor(private recursoService: RecursoService) {}

  ngOnInit() {
    this.obtenerRecursosNoDisponibles();
  }

  obtenerRecursosNoDisponibles() {
    this.recursoService.obtenerRecursosNoDisponibles().subscribe(
      (response) => {
        this.recursosNoDisponibles = response;
      },
      (error) => {
        console.error('Error al obtener recursos no disponibles:', error);
      }
    );
  }

  liberarRecurso(idRecurso: number) {
    this.recursoService.liberarRecursoManualmente(idRecurso).subscribe(
      (response) => {
        alert('Recurso liberado exitosamente');
        this.obtenerRecursosNoDisponibles();
      },
      (error) => {
        console.error('Error al liberar el recurso:', error);
        alert('Error al liberar el recurso');
      }
    );
  }
}
