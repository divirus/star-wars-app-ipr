import {Vehicle} from './vehicle.model';
import {Species} from './species.model';
import {Starship} from './starship.model';
import {Character} from './character.model';
import {Planet} from './planet.model';

export interface Film {
  id: string;
  title: string;
  episodeID: number;
  openingCrawl: string;
  director: string;
  producers: string[];
  releaseDate: string;
  speciesConnection: Species[];
  starshipConnection: Starship[];
  vehicleConnection: Vehicle[];
  characterConnection: Character[];
  planetConnection: Planet[];
}
