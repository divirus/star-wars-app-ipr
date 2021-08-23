import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Planet } from 'src/app/models/planet.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {setSettings, setData} from './store';
import {tableSettingsSelector, tableDataSelector} from './store/selectors';
import {PlanetsTableData, Settings} from './store/reducers/table.reducers';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsComponent implements OnInit, OnDestroy {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
  savedTableSettings: Settings = {limit: this.perPageLimit, page: 0, filter: '', columns: []};
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
    this.store
      .pipe(
        select(tableDataSelector),
        take(1)
      )
      .subscribe((tableData: PlanetsTableData) => {
        if (!tableData.planets) {
          this.getPlanets();
        } else {
          this.planets = tableData.planets;
        }
      });

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined),
        take(1)
      )
      .subscribe((tableSettings) => {
        if (tableSettings?.planets) {
          this.savedTableSettings = tableSettings?.planets;
        }
      });
  }

  ngOnDestroy(): void {
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

  getPlanets(): void {
    this.mainService.getPlanets().subscribe((data) => {
      this.planets = data?.data?.allPlanets?.planets;
      const planetsTableData = {
        tableData: {
          planets: this.planets
        }
      };
      this.store.dispatch(setData(planetsTableData));
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.perPageLimit = this.savedTableSettings.limit;
    this.gridApi.paginationSetPageSize(this.perPageLimit);
    this.gridApi.paginationGoToPage(this.savedTableSettings.page);
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

  onSettingsChange(event: any): void {
    let needToUpdate = false;

    switch (event.type) {
      case 'paginationChanged':
        needToUpdate = event.newPage;
    }

    if (needToUpdate) {
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
}
