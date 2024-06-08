import { Component, OnInit } from '@angular/core';
import { TurnoService } from '../services/turno.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-ver-horarios',
  templateUrl: './ver-horarios.page.html',
  styleUrls: ['./ver-horarios.page.scss'],
})
export class VerHorariosPage implements OnInit {
  calendarOptions: CalendarOptions;

  constructor(private turnoService: TurnoService) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      events: [],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
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
    this.obtenerHorarios();
  }

  ionViewWillEnter() {
    this.obtenerHorarios();
  }

  obtenerHorarios() {
    this.turnoService.obtenerHorarios().subscribe(
      (response) => {
        console.log('Horarios obtenidos:', response); // Log para verificar los datos obtenidos
        const eventsMap: { [key: string]: any } = {};

        response.forEach((turno: any) => {
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
          event.title = Array.from(event.empleados).join('\n');  // Usar '\n' para separar los nombres por líneas
          return event;
        });

        console.log('Eventos procesados:', events); // Log para verificar los eventos procesados
        this.calendarOptions.events = events;
      },
      (error) => {
        console.error('Error al obtener los horarios:', error);
      }
    );
  }
}
