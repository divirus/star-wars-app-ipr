import {Film} from './film.model';
import {Starship} from './starship.model';
import {Vehicle} from './vehicle.model';
import {Planet} from './planet.model';
import {Species} from './species.model';

export interface Character {
  id: string;
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: number;
  mass: number;
  skinColor: string;
  homeWorld: Planet;
  species: Species[];
  filmConnection: Film[];
  starshipConnection: Starship[];
  vehicleConnection: Vehicle[];
}
