import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';

const routes: Routes = [
  { path: 'vehicles', component: VehiclesComponent }
];

@NgModule({
  declarations: [VehiclesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgGridModule.withComponents([]),
  ]
})
export class VehiclesModule { }
