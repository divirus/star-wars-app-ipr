import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';

const FILMS = gql`
  {
    allFilms {
      films {
        id
        title
        episodeID
        openingCrawl
        director
        producers
        releaseDate
        speciesConnection {
          species {
            id
            name
          }
        }
        starshipConnection {
          starships {
            id
            name
          }
        }
        vehicleConnection {
          vehicles {
            id
            name
          }
        }
        characterConnection {
          characters {
            id
            name
          }
        }
        planetConnection {
          planets {
            id
            name
          }
        }
      }
    }
  }
`;
const CHARACTERS = gql`
   {
    allPeople {
      people {
        id
        name
        birthYear
        eyeColor
        gender
        hairColor
        height
        mass
        skinColor
        homeworld {
          name
        }
        species {
          id
          name
        }
        filmConnection {
          films {
            id
            title
          }
        }
        starshipConnection {
          starships {
            id
            name
          }
        }
        vehicleConnection {
          vehicles {
            id
            name
          }
        }
      }
    }
   }
`;
const PLANETS = gql`
  {
    allPlanets {
      planets {
        id
        name
        diameter
        orbitalPeriod
        rotationPeriod
        gravity
        population
        climates
        surfaceWater
        residentConnection {
          residents {
            id
            name
          }
        }
        filmConnection {
          films {
            id
            title
          }
        }
      }
    }
  }
`;
const VEHICLES = gql`
  {
    allVehicles {
      vehicles {
        id
        name
        model
        vehicleClass
        manufacturers
        costInCredits
        length
        crew
        passengers
        maxAtmospheringSpeed
        cargoCapacity
        consumables
        pilotConnection {
          pilots {
            id
            name
          }
        }
        filmConnection {
          films {
            id
            title
          }
        }
      }
    }
  }
`;
const STARSHIPS = gql`
  {
    allStarships {
      starships {
        id
        name
        model
        starshipClass
        manufacturers
        costInCredits
        length
        crew
        passengers
        maxAtmospheringSpeed
        hyperdriveRating
        MGLT
        cargoCapacity
        consumables
        pilotConnection {
          pilots {
            id
            name
          }
        }
        filmConnection {
          films {
            id
            title
          }
        }
      }
    }
  }
`;
const SPECIES = gql`
{
  allSpecies {
    species {
      id
      name
      classification
      designation
      averageHeight
      averageLifespan
      eyeColors
      hairColors
      skinColors
      language
      homeworld {
        name
      }
      personConnection {
        people {
          id
          name
        }
      }
      filmConnection {
        films {
          id
          title
        }
      }
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private apollo: Apollo) {
  }

  getMovies(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: FILMS,
    }).valueChanges;
  }

  getCharacters(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: CHARACTERS,
    }).valueChanges;
  }

  getPlanets(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: PLANETS,
    }).valueChanges;
  }

  getStarships(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: STARSHIPS,
    }).valueChanges;
  }

  getVehicles(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: VEHICLES,
    }).valueChanges;
  }

  getSpecies(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: SPECIES,
    }).valueChanges;
  }
}
