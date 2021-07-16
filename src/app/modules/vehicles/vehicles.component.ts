import {Component, OnInit} from '@angular/core';
import {Vehicle} from 'src/app/models/vehicle.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {setSettings} from '../../store';
import {tableSettingsSelector} from '../../store/selectors';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
  detailModalVisible = false;
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | undefined;
  vehiclesColumns = [
    {field: 'name', sortable: true, filter: true},
    {field: 'model'},
    {field: 'vehicleClass', sortable: true, filter: true},
    {field: 'manufacturers', sortable: true, filter: true},
    {field: 'costInCredits', sortable: true, filter: true},
    {field: 'length', sortable: true, filter: true},
    {field: 'crew'},
    {field: 'passengers'},
    {field: 'maxAtmospheringSpeed', sortable: true, filter: true},
    {field: 'cargoCapacity'},
    {field: 'consumables'},
  ];

  constructor(private mainService: MainService, private store: Store) {
  }

  ngOnInit(): void {
    this.getVehicles();

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined)
      )
      .subscribe((tableSettings) => {
        console.log(tableSettings?.vehicles);
      });
  }

  getVehicles(): void {
    this.mainService.getVehicles().subscribe((data) => {
      this.vehicles = data?.data?.allVehicles?.vehicles;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged(row: any): void {
    this.selectedVehicle = row.data;
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
          vehicles: {
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
