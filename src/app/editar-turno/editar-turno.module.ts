import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTurnoPageRoutingModule } from './editar-turno-routing.module';

import { EditarTurnoPage } from './editar-turno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTurnoPageRoutingModule
  ],
  declarations: [EditarTurnoPage]
})
export class EditarTurnoPageModule {}
