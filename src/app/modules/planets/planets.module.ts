import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './planets.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';

const routes: Routes = [
  { path: 'planets', component: PlanetsComponent }
];

@NgModule({
  declarations: [PlanetsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgGridModule.withComponents([]),
  ]
})
export class PlanetsModule { }
