import {Component, OnDestroy, OnInit} from '@angular/core';
import { Starship } from 'src/app/models/starship.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {setSettings, setData} from './store';
import {tableSettingsSelector, tableDataSelector} from './store/selectors';
import {Settings, StarshipsTableData} from './store/reducers/table.reducers';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit, OnDestroy {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
  savedTableSettings: Settings = {limit: this.perPageLimit, page: 0, filter: '', columns: []};
  detailModalVisible = false;
  starships: Starship[] = [];
  selectedStarship: Starship | undefined;
  starshipsColumns = [
    { field: 'name', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'starshipClass', sortable: true, filter: true },
    { field: 'manufacturers', sortable: true, filter: true },
    { field: 'costInCredits', sortable: true, filter: true },
    { field: 'length', sortable: true, filter: true },
    { field: 'crew' },
    { field: 'passengers' },
    { field: 'maxAtmospheringSpeed', sortable: true, filter: true },
    { field: 'hyperdriveRating' },
    { field: 'MGLT' },
    { field: 'cargoCapacity', sortable: true, filter: true },
    { field: 'consumables' },
  ];

  constructor(private mainService: MainService, private store: Store) {
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(tableDataSelector),
        take(1)
      )
      .subscribe((tableData: StarshipsTableData) => {
        if (!tableData.starships) {
          this.getStarships();
        } else {
          this.starships = tableData.starships;
        }
      });

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined),
        take(1)
      )
      .subscribe((tableSettings) => {
        if (tableSettings?.starships) {
          this.savedTableSettings = tableSettings?.starships;
        }
      });
  }

  ngOnDestroy(): void {
    const tableSettings =
      {
        tableSettings: {
          starships: {
            limit: this.perPageLimit,
            page: this?.gridApi?.paginationGetCurrentPage(),
            filter: this?.gridApi?.getFilterModel(),
            columns: this?.gridColumnApi?.getColumnState(),
          }
        }
      };
    this.store.dispatch(setSettings(tableSettings));
  }

  getStarships(): void {
    this.mainService.getStarships().subscribe((data) => {
      this.starships = data?.data?.allStarships?.starships;
      const starshipsTableData = {
        tableData: {
          starships: this.starships
        }
      };
      this.store.dispatch(setData(starshipsTableData));
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
    this.selectedStarship = row.data;
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
}
