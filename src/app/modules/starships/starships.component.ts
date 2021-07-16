import { Component, OnInit } from '@angular/core';
import { Starship } from 'src/app/models/starship.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {setSettings} from '../../store';
import {tableSettingsSelector} from '../../store/selectors';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
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
    this.getStarships();

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined)
      )
      .subscribe((tableSettings) => {
        console.log(tableSettings?.starships);
      });
  }

  getStarships(): void {
    this.mainService.getStarships().subscribe((data) => {
      this.starships = data?.data?.allStarships?.starships;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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

  onSettingsChange(): void {
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
}
