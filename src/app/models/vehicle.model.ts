import {Movie} from './movie.model';
import {Character} from './character.model';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  vehicleClass: string;
  manufacturers: string[];
  costInCredits: number;
  length: number;
  crew: string;
  passengers: string;
  maxAtmospheringSpeed: number;
  cargoCapacity: number;
  consumables: string;
  pilotConnection: Character[];
  filmConnection: Movie[];
}
