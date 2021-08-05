import {Component, OnDestroy, OnInit} from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { MainService } from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {filter, take } from 'rxjs/operators';
import {setData, setSettings} from './store';
import {tableDataSelector, tableSettingsSelector} from './store/selectors';
import {CharactersTableData, Settings, TableSettings} from './store/reducers/table.reducers';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
  savedTableSettings: Settings = {limit: this.perPageLimit, page: 0, filter: '', columns: []};
  detailModalVisible = false;
  characters: Character[] = [];
  selectedCharacter: Character | undefined;
  charactersColumns = [
    {field: 'name', sortable: true, filter: true},
    {field: 'birthYear', sortable: true, filter: true},
    {field: 'eyeColor'},
    {field: 'gender', sortable: true, filter: true},
    {field: 'hairColor'},
    {field: 'height', sortable: true, filter: true},
    {field: 'mass', sortable: true, filter: true},
    {field: 'skinColor'},
  ];

  constructor(private mainService: MainService, private store: Store) {
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(tableDataSelector),
        take(1)
      )
      .subscribe((tableData: CharactersTableData) => {
        if (!tableData.characters) {
          this.getCharacters();
        } else {
          this.characters = tableData.characters;
        }
      });

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined),
        take(1)
      )
      .subscribe((tableSettings: TableSettings) => {
        if (tableSettings?.characters) {
          this.savedTableSettings = tableSettings.characters;
        }
      });
  }

  ngOnDestroy(): void {
    const tableSettings =
      {
        tableSettings: {
          characters: {
            limit: this.perPageLimit,
            page: this?.gridApi?.paginationGetCurrentPage(),
            filter: this?.gridApi?.getFilterModel(),
            columns: this?.gridColumnApi?.getColumnState(),
          }
        }
      };
    this.store.dispatch(setSettings(tableSettings));
  }

  getCharacters(): void {
    this.mainService.getCharacters().subscribe((data) => {
      this.characters = data?.data?.allPeople?.people;
      const charactersTableData = {
        tableData: {
          characters: this.characters
        }
      };
      this.store.dispatch(setData(charactersTableData));
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
    this.selectedCharacter = row.data;
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
