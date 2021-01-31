import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PersonComponent} from './components/person/person.component';
import {StarshipComponent} from './components/starship/starship.component';
import {PlanetComponent} from './components/planet/planet.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'person', component: PersonComponent },
  { path: 'starship', component: StarshipComponent },
  { path: 'planet', component: PlanetComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    PersonComponent,
    StarshipComponent,
    PlanetComponent,
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
