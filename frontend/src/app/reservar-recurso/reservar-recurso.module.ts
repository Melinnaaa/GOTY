import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservarRecursoPageRoutingModule } from './reservar-recurso-routing.module';

import { ReservarRecursoPage } from './reservar-recurso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservarRecursoPageRoutingModule
  ],
  declarations: [ReservarRecursoPage]
})
export class ReservarRecursoPageModule {}
