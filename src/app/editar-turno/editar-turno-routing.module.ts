import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTurnoPage } from './editar-turno.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTurnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTurnoPageRoutingModule {}
