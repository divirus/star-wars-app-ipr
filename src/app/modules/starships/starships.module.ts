import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StarshipsComponent } from './starships.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {reducers} from './store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from '../../app.effects';

const metaReducers: MetaReducer<any>[] = [];
const routes: Routes = [
  { path: 'starships', component: StarshipsComponent }
];

@NgModule({
  declarations: [StarshipsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects])
  ]
})
export class StarshipsModule { }
