import {Character} from './character.model';
import {Movie} from './movie.model';

export interface Starship {
  id: string;
  name: string;
  model: string;
  starshipClass: string;
  manufacturers: string[];
  costInCredits: number;
  length: number;
  crew: string;
  passengers: string;
  maxAtmospheringSpeed: number;
  hyperdriveRating: number;
  MGLT: number;
  cargoCapacity: number;
  consumables: string;
  pilotConnection: Character[];
  filmConnection: Movie[];
}
