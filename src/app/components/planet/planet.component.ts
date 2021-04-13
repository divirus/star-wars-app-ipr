import {Component, OnInit} from '@angular/core';
import { Planet } from 'src/app/models/planet.model';
import {MainService} from '../../core/services/main.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  detailModalVisible = false
  planets: Planet[] = [];
  selectedPlanet: Planet | undefined;
  planetsColumns = [
    { field: 'name', sortable: true, filter: true },
    { field: 'diameter', sortable: true, filter: true },
    { field: 'orbitalPeriod', sortable: true, filter: true },
    { field: 'rotationPeriod', sortable: true, filter: true },
    { field: 'gravity', sortable: true, filter: true },
    { field: 'population', sortable: true, filter: true },
    { field: 'climates', sortable: true, filter: true },
    { field: 'surfaceWater', sortable: true, filter: true },
  ];

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.getPlanets();
  }

  getPlanets(): void {
    this.mainService.getPlanets().subscribe((data) => {
      this.planets = data?.data?.allPlanets?.planets;
    });
  }

  onSelectionChanged(row: any): void {
    this.selectedPlanet = row.data;
    this.openModal();
  }

  openModal(): void {
    this.detailModalVisible = true;
  }

  closeModal(): void {
    this.detailModalVisible = false;
  }
}
