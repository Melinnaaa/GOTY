import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnoService } from '../services/turno.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  calendarOptions: CalendarOptions;

  constructor(private turnoService: TurnoService, private router: Router) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      events: [],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: this.handleDateClick.bind(this), // bind the method to this context
      eventDisplay: 'block',
      eventTextColor: 'white',
      eventBackgroundColor: 'blue',
      height: 'auto',
      eventDidMount: function(info) {
        info.el.innerHTML = info.event.title.replace(/\n/g, '<br>');
      }
    };
  }

  ngOnInit() {
    this.cargarHorario();
  }

  cargarHorario() {
    const today = new Date();
    const mes = today.getMonth() + 1;
    const ano = today.getFullYear();

    this.turnoService.obtenerHorarios().subscribe(
      (response) => {
        if (response.length === 0) {
          this.generarHorario(mes, ano);
        } else {
          this.actualizarEventos(response);
        }
      },
      (error) => {
        console.error('Error al cargar el horario:', error);
      }
    );
  }

  generarNuevoHorario() {
    const today = new Date();
    const mes = today.getMonth() + 1;
    const ano = today.getFullYear();
    this.generarHorario(mes, ano, true);
  }

  generarHorario(mes: number, ano: number, forzar: boolean = false) {
    this.turnoService.generarHorario(mes, ano, forzar).subscribe(
      (response) => {
        this.actualizarEventos(response);
      },
      (error) => {
        console.error('Error al generar el horario:', error);
      }
    );
  }

  actualizarEventos(turnos: any[]) {
    const eventsMap: { [key: string]: any } = {};

    turnos.forEach((turno: any) => {
      const dateKey = turno.fecha;
      if (!eventsMap[dateKey]) {
        eventsMap[dateKey] = {
          title: '',
          start: turno.fecha,
          empleados: new Set()
        };
      }
      eventsMap[dateKey].empleados.add(turno.Empleado.Nombre);
    });

    const events = Object.values(eventsMap).map((event: any) => {
      event.title = Array.from(event.empleados).join('<br>');  // Usar '<br>' para separar los nombres por líneas
      return event;
    });

    this.calendarOptions.events = events;
  }

  handleDateClick(arg: any) {
    const fecha = arg.dateStr;
    console.log(`Date clicked: ${fecha}`);
    this.router.navigate(['/editar-turno', fecha]);
  }
}
