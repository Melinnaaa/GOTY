import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnoService } from '../services/turno.service';

@Component({
  selector: 'app-editar-turno',
  templateUrl: './editar-turno.page.html',
  styleUrls: ['./editar-turno.page.scss'],
})
export class EditarTurnoPage implements OnInit {
  fecha: string;
  turnos: any[] = [];
  empleados: any[] = [];
  nuevoEmpleado: any;

  constructor(private turnoService: TurnoService, private route: ActivatedRoute) {
    this.fecha = '';
  }

  ngOnInit() {
    this.fecha = this.route.snapshot.paramMap.get('fecha')!;
    this.cargarTurnos();
    this.cargarEmpleados();
  }

  cargarTurnos() {
    this.turnoService.obtenerTurnosPorFecha(this.fecha).subscribe(
      (response) => {
        this.turnos = response;
      },
      (error) => {
        console.error('Error al cargar los turnos:', error);
      }
    );
  }

  cargarEmpleados() {
    this.turnoService.obtenerTodosLosEmpleados().subscribe(
      (response) => {
        this.empleados = response;
      },
      (error) => {
        console.error('Error al cargar los empleados:', error);
      }
    );
  }

  eliminarEmpleado(turno: any) {
    this.turnos = this.turnos.filter(t => t.RutEmpleado !== turno.RutEmpleado);
  }

  agregarEmpleado() {
    if (this.nuevoEmpleado && !this.turnos.find(t => t.RutEmpleado === this.nuevoEmpleado.Rut)) {
      this.turnos.push({ fecha: this.fecha, RutEmpleado: this.nuevoEmpleado.Rut, Empleado: this.nuevoEmpleado });
      this.nuevoEmpleado = null;
    }
  }

  guardarCambios() {
    this.turnoService.actualizarTurnos(this.fecha, this.turnos).subscribe(
      (response) => {
        alert('Turnos actualizados correctamente');
      },
      (error) => {
        console.error('Error al actualizar los turnos:', error);
        alert('Error al actualizar los turnos');
      }
    );
  }
}
