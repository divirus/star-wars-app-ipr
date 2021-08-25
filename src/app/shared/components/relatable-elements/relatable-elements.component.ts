import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {MainService} from '../../../core/services/main.service';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-relatable-elements',
  templateUrl: './relatable-elements.component.html',
  styleUrls: ['./relatable-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatableElementsComponent implements OnInit {
  @Input() elements: any;
  @Input() elementType: any;
  @Input() elementsData: any;

  @Output() elementsDataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() makeModalData: EventEmitter<any> = new EventEmitter();

  constructor(private mainService: MainService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  openDetailedCard(card: any): void {
    switch (card.target.getAttribute('elementType')) {
      case 'movie':
        this.mainService.getMovie(card.target.id).subscribe((respond) => {
          this.elementsDataChange.emit(respond.data.film);
          this.cdr.markForCheck();
          this.makeModalData.emit();
        });
        break;
      case 'starship':
        this.mainService.getStarship(card.target.id).subscribe((respond) => {
          this.elementsDataChange.emit(respond.data.starship);
          this.cdr.markForCheck();
          this.makeModalData.emit();
        });
        break;
      case 'vehicle':
        this.mainService.getVehicle(card.target.id).subscribe((respond) => {
          this.elementsDataChange.emit(respond.data.vehicle);
          this.cdr.markForCheck();
          this.makeModalData.emit();
        });
        break;
      case 'planet':
        this.mainService.getPlanet(card.target.id).subscribe((respond) => {
          this.elementsDataChange.emit(respond.data.planet);
          this.cdr.markForCheck();
          this.makeModalData.emit();
        });
        break;
      case 'character':
        this.mainService.getCharacter(card.target.id).subscribe((respond) => {
          this.elementsDataChange.emit(respond.data.person);
          this.cdr.markForCheck();
          this.makeModalData.emit();
        });
        break;
      case 'specie':
        this.mainService.getSpecie(card.target.id).subscribe((respond) => {
          this.elementsDataChange.emit(respond.data.species);
          this.cdr.markForCheck();
          this.makeModalData.emit();
        });
        break;
    }
  }
}
