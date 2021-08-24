import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';

const MOVIES = gql`
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
const MOVIE = gql`
  query($id: ID) {
    film(id: $id) {
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
const CHARACTER = gql`
  query($id: ID) {
    person(id: $id) {
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
const PLANET = gql`
  query($id: ID) {
    planet(id: $id) {
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
const VEHICLE = gql`
  query($id: ID) {
    vehicle(id: $id) {
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
const STARSHIP = gql`
  query($id: ID) {
    starship(id: $id) {
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
const SPECIE = gql`
  query($id: ID) {
    species(id: $id) {
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
`;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private apollo: Apollo) {
  }

  getMovies(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: MOVIES,
    }).valueChanges;
  }

  getMovie(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      variables: {
        id
      },
      query: MOVIE,
    }).valueChanges;
  }

  getCharacters(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: CHARACTERS,
    }).valueChanges;
  }

  getCharacter(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      variables: {
        id
      },
      query: CHARACTER,
    }).valueChanges;
  }

  getPlanets(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: PLANETS,
    }).valueChanges;
  }

  getPlanet(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      variables: {
        id
      },
      query: PLANET,
    }).valueChanges;
  }

  getStarships(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: STARSHIPS,
    }).valueChanges;
  }

  getStarship(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      variables: {
        id
      },
      query: STARSHIP,
    }).valueChanges;
  }

  getVehicles(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: VEHICLES,
    }).valueChanges;
  }

  getVehicle(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      variables: {
        id
      },
      query: VEHICLE,
    }).valueChanges;
  }

  getSpecies(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: SPECIES,
    }).valueChanges;
  }

  getSpecie(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      variables: {
        id
      },
      query: SPECIE,
    }).valueChanges;
  }
}
