import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { MainService } from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {setSettings} from '../../store';
import {tableSettingsSelector} from '../../store/selectors';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
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
    this.getCharacters();

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined)
      )
      .subscribe((tableSettings) => {
        console.log(tableSettings?.characters);
      });
  }

  getCharacters(): void {
    this.mainService.getCharacters().subscribe((data) => {
      this.characters = data?.data?.allPeople?.people;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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

  onSettingsChange(): void {
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
}
