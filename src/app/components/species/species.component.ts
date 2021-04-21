import { Component, OnInit } from '@angular/core';
import { Species } from 'src/app/models/species.model';
import {MainService} from '../../core/services/main.service';

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

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.getSpecies();
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
}
