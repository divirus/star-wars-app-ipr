import { Component, OnInit } from '@angular/core';
import { Species } from 'src/app/models/species.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {setSettings} from '../../store';
import {tableSettingsSelector} from '../../store/selectors';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
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
    this.getSpecies();

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined)
      )
      .subscribe((tableSettings) => {
        console.log(tableSettings?.species);
      });
  }

  getSpecies(): void {
    this.mainService.getSpecies().subscribe((data) => {
      this.species = data?.data?.allSpecies?.species;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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

  onSettingsChange(): void {
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
