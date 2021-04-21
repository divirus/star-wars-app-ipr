import { Component, OnInit } from '@angular/core';
import { Starship } from 'src/app/models/starship.model';
import {MainService} from '../../core/services/main.service';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss']
})
export class StarshipComponent implements OnInit {
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

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.getStarships();
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
}
