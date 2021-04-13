import {Component, OnInit} from '@angular/core';
import { Character } from 'src/app/models/character.model';
import {MainService} from '../../core/services/main.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  detailModalVisible = false
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

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.mainService.getCharacters().subscribe((data) => {
      this.characters = data?.data?.allPeople?.people;
    });
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
}
