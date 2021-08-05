import {Component, OnDestroy, OnInit} from '@angular/core';
import {Vehicle} from 'src/app/models/vehicle.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {setSettings, setData} from './store';
import {tableSettingsSelector, tableDataSelector} from './store/selectors';
import {Settings, VehiclesTableData} from './store/reducers/table.reducers';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
  savedTableSettings: Settings = {limit: this.perPageLimit, page: 0, filter: '', columns: []};
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
    this.store
      .pipe(
        select(tableDataSelector),
        take(1)
      )
      .subscribe((tableData: VehiclesTableData) => {
        if (!tableData.vehicles) {
          this.getVehicles();
        } else {
          this.vehicles = tableData.vehicles;
        }
      });

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined),
        take(1)
      )
      .subscribe((tableSettings) => {
        if (tableSettings?.vehicles) {
          this.savedTableSettings = tableSettings?.vehicles;
        }
      });
  }

  ngOnDestroy(): void {
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

  getVehicles(): void {
    this.mainService.getVehicles().subscribe((data) => {
      this.vehicles = data?.data?.allVehicles?.vehicles;
      const vehiclesTableData = {
        tableData: {
          vehicles: this.vehicles
        }
      };
      this.store.dispatch(setData(vehiclesTableData));
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
}
