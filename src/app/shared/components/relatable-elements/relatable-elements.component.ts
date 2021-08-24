import {Component, Input, OnInit} from '@angular/core';
import {MainService} from '../../../core/services/main.service';

@Component({
  selector: 'app-relatable-elements',
  templateUrl: './relatable-elements.component.html',
  styleUrls: ['./relatable-elements.component.scss']
})
export class RelatableElementsComponent implements OnInit {
  @Input() elements: any;
  @Input() elementType: any;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {}

  openDetailedCard(card: any): void {
    switch (card.target.getAttribute('elementType')) {
      case 'movie':
        this.mainService.getMovie(card.target.id).subscribe((data) => {
          console.log(data);
        });
        break;
      case 'starship':
        this.mainService.getStarship(card.target.id).subscribe((data) => {
          console.log(data);
        });
        break;
      case 'vehicle':
        this.mainService.getVehicle(card.target.id).subscribe((data) => {
          console.log(data);
        });
        break;
      case 'planet':
        this.mainService.getPlanet(card.target.id).subscribe((data) => {
          console.log(data);
        });
        break;
      case 'character':
        this.mainService.getCharacter(card.target.id).subscribe((data) => {
          console.log(data);
        });
        break;
      case 'specie':
        this.mainService.getSpecie(card.target.id).subscribe((data) => {
          console.log(data);
        });
        break;
    }
  }
}
