import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HorarioPageRoutingModule } from './horario-routing.module';
import { HorarioPage } from './horario.page';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioPageRoutingModule,
    FullCalendarModule
  ],
  declarations: [HorarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HorarioPageModule {}
