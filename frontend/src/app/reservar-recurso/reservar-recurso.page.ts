import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-reservar-recurso',
  templateUrl: './reservar-recurso.page.html',
  styleUrls: ['./reservar-recurso.page.scss'],
})
export class ReservarRecursoPage implements OnInit {
  recursos: any[] = [];
  rut: string | null = '';

  constructor(private recursoService: RecursoService) {}

  ngOnInit() {
    this.rut = localStorage.getItem('rut');
    this.obtenerRecursosDisponibles();
  }

  obtenerRecursosDisponibles() {
    this.recursoService.obtenerRecursosDisponibles().subscribe(
      (response) => {
        this.recursos = response;
      },
      (error) => {
        console.error('Error al obtener recursos disponibles:', error);
      }
    );
  }

  reservarRecurso(idRecurso: number) {
    if (this.rut) {
      this.recursoService.reservarRecurso(idRecurso, this.rut).subscribe(
        (response) => {
          alert('Recurso reservado exitosamente');
          this.obtenerRecursosDisponibles();
        },
        (error) => {
          console.error('Error al reservar el recurso:', error);
          alert('Error al reservar el recurso');
        }
      );
    }
  }
}
