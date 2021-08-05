import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {GraphQLModule} from './graphql.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DreamTeamComponent} from './components/dream-team/dream-team.component';
import {SharedModule} from './shared/shared.module';
import {CharactersModule} from './modules/characters/characters.module';
import {MoviesModule} from './modules/movies/movies.module';
import {PlanetsModule} from './modules/planets/planets.module';
import {SpeciesModule} from './modules/species/species.module';
import {StarshipsModule} from './modules/starships/starships.module';
import {VehiclesModule} from './modules/vehicles/vehicles.module';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'characters', loadChildren: () => import('./modules/characters/characters.module').then(m => m.CharactersModule) },
  { path: 'movies', loadChildren: () => import('./modules/movies/movies.module').then(m => m.MoviesModule) },
  { path: 'planets', loadChildren: () => import('./modules/planets/planets.module').then(m => m.PlanetsModule) },
  { path: 'species', loadChildren: () => import('./modules/species/species.module').then(m => m.SpeciesModule) },
  { path: 'starships', loadChildren: () => import('./modules/starships/starships.module').then(m => m.StarshipsModule) },
  { path: 'vehicles', loadChildren: () => import('./modules/vehicles/vehicles.module').then(m => m.VehiclesModule) },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DreamTeamComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    SharedModule,
    CharactersModule,
    MoviesModule,
    PlanetsModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
