import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() modalData: any = {};
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  formGroup: any;
  elementType: string | null = null;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const formControl: any = {};

    if (this.modalData) {
      let formState = null;

      Object.keys(this.modalData)
        .forEach(data => {
          formState = null;

          formControl[data] = new FormControl(formState);

          switch (data) {
            case 'homeworld':
              formControl[data].setValue(this.modalData[data]?.name || []);
              break;
            case 'filmConnection':
              formControl[data].setValue(this.modalData[data]?.films || []);
              this.elementType = 'movie';
              break;
            case 'starshipConnection':
              formControl[data].setValue(this.modalData[data]?.starships || []);
              this.elementType = 'starship';
              break;
            case 'vehicleConnection':
              formControl[data].setValue(this.modalData[data]?.vehicles || []);
              this.elementType = 'vehicle';
              break;
            case 'planetConnection':
              formControl[data].setValue(this.modalData[data]?.planets || []);
              this.elementType = 'planet';
              break;
            case 'pilotConnection':
              formControl[data].setValue(this.modalData[data]?.pilots || []);
              this.elementType = 'pilot';
              break;
            case 'speciesConnection':
              formControl[data].setValue(this.modalData[data]?.species || []);
              this.elementType = 'specie';
              break;
            case 'characterConnection':
              formControl[data].setValue(this.modalData[data]?.characters || []);
              this.elementType = 'character';
              break;
            case 'residentConnection':
              formControl[data].setValue(this.modalData[data]?.residents || []);
              this.elementType = 'resident';
              break;
            case 'personConnection':
              formControl[data].setValue(this.modalData[data]?.people || []);
              this.elementType = 'person';
              break;
            default:
              formControl[data].setValue(this.modalData[data] || 'n/a');
              break;
          }
        });
    }

    this.formGroup = this.fb.group(formControl);
  }

  onClose(): void {
    this.closeModal.emit();
    this.modalData = null;
  }

  getElementType(key: any): any {
    switch (key) {
      case 'filmConnection':
        return 'movie';
      case 'starshipConnection':
        return 'starship';
      case 'vehicleConnection':
        return 'vehicle';
      case 'planetConnection':
        return 'planet';
      case 'speciesConnection':
        return 'specie';
      case 'pilotConnection':
      case 'characterConnection':
      case 'personConnection':
      case 'residentConnection':
        return 'character';
      default:
        return null;
    }
  }
}
