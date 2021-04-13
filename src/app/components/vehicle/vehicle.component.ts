import {Component, OnInit} from '@angular/core';
import {Vehicle} from 'src/app/models/vehicle.model';
import {MainService} from '../../core/services/main.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
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

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.mainService.getVehicles().subscribe((data) => {
      this.vehicles = data?.data?.allVehicles?.vehicles;
    });
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
}
