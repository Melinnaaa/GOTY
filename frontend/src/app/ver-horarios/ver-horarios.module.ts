import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerHorariosPageRoutingModule } from './ver-horarios-routing.module';

import { VerHorariosPage } from './ver-horarios.page';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerHorariosPageRoutingModule,
    FullCalendarModule
  ],
  declarations: [VerHorariosPage]
})
export class VerHorariosPageModule {}
