import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRecursosPageRoutingModule } from './admin-recursos-routing.module';

import { AdminRecursosPage } from './admin-recursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRecursosPageRoutingModule
  ],
  declarations: [AdminRecursosPage]
})
export class AdminRecursosPageModule {}
