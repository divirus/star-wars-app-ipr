import {Planet} from './planet.model';
import {Character} from './character.model';
import {Movie} from './movie.model';

export interface Species {
  id: string;
  name: string;
  classification: string;
  designation: string;
  averageHeight: number;
  averageLifespan: number;
  eyeColors: string[];
  hairColors: string[];
  skinColors: string[];
  language: string;
  homeWorld: Planet;
  personConnection: Character[];
  filmConnection: Movie[];
}


