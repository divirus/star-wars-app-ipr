import {Component, OnDestroy, OnInit} from '@angular/core';
import { Species } from 'src/app/models/species.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {setSettings, setData} from './store';
import {tableSettingsSelector, tableDataSelector} from './store/selectors';
import {Settings, SpeciesTableData} from './store/reducers/table.reducers';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit, OnDestroy {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
  savedTableSettings: Settings = {limit: this.perPageLimit, page: 0, filter: '', columns: []};
  detailModalVisible = false;
  species: Species[] = [];
  selectedSpecies: Species | undefined;
  speciesColumns = [
    { field: 'name', sortable: true, filter: true },
    { field: 'classification', sortable: true, filter: true },
    { field: 'designation', sortable: true, filter: true },
    { field: 'averageHeight' },
    { field: 'averageLifespan' },
    { field: 'eyeColors' },
    { field: 'hairColors' },
    { field: 'skinColors' },
    { field: 'language', sortable: true, filter: true },
  ];

  constructor(private mainService: MainService, private store: Store) {
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(tableDataSelector),
        take(1)
      )
      .subscribe((tableData: SpeciesTableData) => {
        if (!tableData.species) {
          this.getSpecies();
        } else {
          this.species = tableData.species;
        }
      });

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined),
        take(1)
      )
      .subscribe((tableSettings) => {
        if (tableSettings?.species) {
          this.savedTableSettings = tableSettings?.species;
        }
      });
  }

  ngOnDestroy(): void {
    const tableSettings =
      {
        tableSettings: {
          species: {
            limit: this.perPageLimit,
            page: this?.gridApi?.paginationGetCurrentPage(),
            filter: this?.gridApi?.getFilterModel(),
            columns: this?.gridColumnApi?.getColumnState(),
          }
        }
      };
    this.store.dispatch(setSettings(tableSettings));
  }

  getSpecies(): void {
    this.mainService.getSpecies().subscribe((data) => {
      this.species = data?.data?.allSpecies?.species;
      const speciesTableData = {
        tableData: {
          species: this.species
        }
      };
      this.store.dispatch(setData(speciesTableData));
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
    this.selectedSpecies = row.data;
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
            species: {
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
