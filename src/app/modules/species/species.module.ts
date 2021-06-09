import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SpeciesComponent } from './species.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';

const routes: Routes = [
  { path: 'species', component: SpeciesComponent }
];

@NgModule({
  declarations: [SpeciesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgGridModule.withComponents([]),
  ]
})
export class SpeciesModule { }
