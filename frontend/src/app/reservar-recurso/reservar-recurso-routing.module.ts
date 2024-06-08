import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservarRecursoPage } from './reservar-recurso.page';

const routes: Routes = [
  {
    path: '',
    component: ReservarRecursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservarRecursoPageRoutingModule {}
