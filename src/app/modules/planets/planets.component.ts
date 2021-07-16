import {Component, OnInit} from '@angular/core';
import { Planet } from 'src/app/models/planet.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {setSettings} from '../../store';
import {tableSettingsSelector} from '../../store/selectors';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
  detailModalVisible = false;
  planets: Planet[] = [];
  selectedPlanet: Planet | undefined;
  planetsColumns = [
    { field: 'name', sortable: true, filter: true },
    { field: 'diameter', sortable: true, filter: true },
    { field: 'orbitalPeriod', sortable: true, filter: true },
    { field: 'rotationPeriod', sortable: true, filter: true },
    { field: 'gravity', sortable: true, filter: true },
    { field: 'population', sortable: true, filter: true },
    { field: 'climates', sortable: true, filter: true },
    { field: 'surfaceWater', sortable: true, filter: true },
  ];

  constructor(private mainService: MainService, private store: Store) {
  }

  ngOnInit(): void {
    this.getPlanets();

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined)
      )
      .subscribe((tableSettings) => {
        console.log(tableSettings?.planets);
      });
  }

  getPlanets(): void {
    this.mainService.getPlanets().subscribe((data) => {
      this.planets = data?.data?.allPlanets?.planets;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged(row: any): void {
    this.selectedPlanet = row.data;
    this.openModal();
  }

  openModal(): void {
    this.detailModalVisible = true;
  }

  closeModal(): void {
    this.detailModalVisible = false;
  }

  changePerPageLimit(event: any): void {
    this.perPageLimit = event.target.valueAsNumber;
    this.gridApi.paginationSetPageSize(this.perPageLimit);
  }

  onSettingsChange(): void {
    const tableSettings =
      {
        tableSettings: {
          planets: {
            limit: this.perPageLimit,
            page: this?.gridApi?.paginationGetCurrentPage(),
            filter: this?.gridApi?.getFilterModel(),
            columns: this?.gridColumnApi?.getColumnState(),
          }
        }
      };
    this.store.dispatch(setSettings(tableSettings));
  }
}
