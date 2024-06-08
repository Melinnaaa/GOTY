import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRecursosPage } from './admin-recursos.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRecursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRecursosPageRoutingModule {}
