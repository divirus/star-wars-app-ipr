import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {StarshipComponent} from './components/starship/starship.component';
import {PlanetComponent} from './components/planet/planet.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {PersonComponent} from './components/person/person.component';
import {SpeciesComponent} from './components/species/species.component';
import {VehicleComponent} from './components/vehicle/vehicle.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'persons', component: PersonComponent},
  {path: 'starships', component: StarshipComponent},
  {path: 'vehicles', component: VehicleComponent},
  {path: 'planets', component: PlanetComponent},
  {path: 'species', component: SpeciesComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    PersonComponent,
    StarshipComponent,
    PlanetComponent,
    SpeciesComponent,
    VehicleComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
