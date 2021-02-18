import {Character} from './character.model';
import {Film} from './film.model';

export interface Planet {
  id: string;
  name: string;
  diameter: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  gravity: string;
  population: number;
  climates: string[];
  surfaceWater: number;
  residentConnection: Character[];
  filmConnection: Film[];
}
