import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MainService} from '../../core/services/main.service';
import {tableDataSelector as characterTableDataSelector} from '../../modules/characters/store/selectors';
import {tableDataSelector as planetTableDataSelector} from '../../modules/planets/store/selectors';
import {tableDataSelector as starshipsTableDataSelector} from '../../modules/starships/store/selectors';
import {tableDataSelector as vehiclesTableDataSelector} from '../../modules/vehicles/store/selectors';
import {take} from 'rxjs/operators';
import {setData as setCharactersData} from '../../modules/characters/store';
import {setData as setPlanetsData} from '../../modules/planets/store';
import {setData as setStarshipsData} from '../../modules/starships/store';
import {setData as setVehiclesData} from '../../modules/vehicles/store';
import {CharactersTableData} from '../../modules/characters/store/reducers/table.reducers';
import {PlanetsTableData} from '../../modules/planets/store/reducers/table.reducers';
import {StarshipsTableData} from '../../modules/starships/store/reducers/table.reducers';
import {VehiclesTableData} from '../../modules/vehicles/store/reducers/table.reducers';
import {Character} from '../../models/character.model';
import {Planet} from '../../models/planet.model';
import {Starship} from '../../models/starship.model';
import {Vehicle} from '../../models/vehicle.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dream-team',
  templateUrl: './dream-team.component.html',
  styleUrls: ['./dream-team.component.scss']
})
export class DreamTeamComponent implements OnInit {

  characters: Character[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];
  planets: Planet[] = [];
  charactersSelect: string[] = [];
  starshipsSelect: string[] = [];
  vehiclesSelect: string[] = [];
  planetsSelect: string[] = [];

  selectedCharacters: {selectId: string, name: string}[] = [];

  dreamTeamSquad = [
    {id: 'leader', name: 'Лидер команды'},
    {id: 'traitor', name: 'Будущий предатель'},
    {id: 'weapons', name: 'Эксперт по оружию'},
    {id: 'genius', name: 'Гений'},
    {id: 'doctor', name: 'Врач'},
    {id: 'fighter', name: 'Мастер боевых искусств'},
    {id: 'mascot', name: 'Талисман'},
    {id: 'deadman', name: 'Парень, который погибнет первым'},
  ];

  formGroup: FormGroup = this.fb.group({
    charactersSelect: this.fb.control(['']),
    planetsSelect: this.fb.control(['']),
    starshipsSelect: this.fb.control(['']),
    vehiclesSelect: this.fb.control(['']),
  });

  constructor(private store: Store, private mainService: MainService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCharacters();
    this.getPlanets();
    this.getStarships();
    this.getVehicles();
  }

  getCharacters(): void {
    this.store
      .pipe(
        select(characterTableDataSelector),
        take(1)
      )
      .subscribe((tableData: CharactersTableData) => {
        if (!tableData.characters) {
          this.mainService.getCharacters().subscribe((data) => {
            this.characters = data?.data?.allPeople?.people;
            const charactersTableData = {
              tableData: {
                characters: this.characters
              }
            };

            this.store.dispatch(setCharactersData(charactersTableData));
            this.charactersSelect = [...new Set(this.characters.map((x) => x.name))].sort();
          });
        } else {
          this.characters = tableData.characters;
          this.charactersSelect = [...new Set(this.characters.map((x) => x.name))].sort();
        }
      });
  }

  getPlanets(): void {
    this.store
      .pipe(
        select(planetTableDataSelector),
        take(1)
      )
      .subscribe((tableData: PlanetsTableData) => {
        if (!tableData.planets) {
          this.mainService.getPlanets().subscribe((data) => {
            this.planets = data?.data?.allPlanets?.planets;
            const planetsTableData = {
              tableData: {
                planets: this.planets
              }
            };
            this.store.dispatch(setPlanetsData(planetsTableData));
            this.planetsSelect = [...new Set(this.planets.map((x) => x.name))].sort();
          });
        } else {
          this.planets = tableData.planets;
          this.planetsSelect = [...new Set(this.planets.map((x) => x.name))].sort();
        }
      });
  }

  getStarships(): void {
    this.store
      .pipe(
        select(starshipsTableDataSelector),
        take(1)
      )
      .subscribe((tableData: StarshipsTableData) => {
        if (!tableData.starships) {
          this.mainService.getStarships().subscribe((data) => {
            this.starships = data?.data?.allStarships?.starships;
            const starshipsTableData = {
              tableData: {
                starships: this.starships
              }
            };
            this.store.dispatch(setStarshipsData(starshipsTableData));
            this.starshipsSelect = [...new Set(this.starships.map((x) => x.name))].sort();
          });
        } else {
          this.starships = tableData.starships;
          this.starshipsSelect = [...new Set(this.starships.map((x) => x.name))].sort();
        }
      });
  }

  getVehicles(): void {
    this.store
      .pipe(
        select(vehiclesTableDataSelector),
        take(1)
      )
      .subscribe((tableData: VehiclesTableData) => {
        if (!tableData.vehicles) {
          this.mainService.getVehicles().subscribe((data) => {
            this.vehicles = data?.data?.allVehicles?.vehicles;
            const vehiclesTableData = {
              tableData: {
                vehicles: this.vehicles
              }
            };
            this.store.dispatch(setVehiclesData(vehiclesTableData));
            this.vehiclesSelect = [...new Set(this.vehicles.map((x) => x.name))].sort();
          });
        } else {
          this.vehicles = tableData.vehicles;
          this.vehiclesSelect = [...new Set(this.vehicles.map((x) => x.name))].sort();
        }
      });
  }

  onChangeCharacter(event: any): void {
    const characterIndex = this.selectedCharacters.findIndex((char => char.selectId === event.target.id));

    if (characterIndex !== -1) {
      this.selectedCharacters[characterIndex].name = event.target.value;
    } else {
      this.selectedCharacters = [...[{
        selectId: event.target.id,
        name: event.target.value,
      }], ...this.selectedCharacters];
    }
  }

  formattedCharactersArray(): string[] {
    return this.selectedCharacters.map(x => x.name);
  }
}
