import {Component, HostBinding, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() modalData: any = {};
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  formGroup: any;

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
              break;
            case 'starshipConnection':
              formControl[data].setValue(this.modalData[data]?.starships || []);
              break;
            case 'vehicleConnection':
              formControl[data].setValue(this.modalData[data]?.vehicles || []);
              break;
            case 'planetConnection':
              formControl[data].setValue(this.modalData[data]?.planets || []);
              break;
            case 'pilotConnection':
              formControl[data].setValue(this.modalData[data]?.pilots || []);
              break;
            case 'speciesConnection':
              formControl[data].setValue(this.modalData[data]?.species || []);
              break;
            case 'characterConnection':
              formControl[data].setValue(this.modalData[data]?.characters || []);
              break;
            case 'residentConnection':
              formControl[data].setValue(this.modalData[data]?.residents || []);
              break;
            case 'personConnection':
              formControl[data].setValue(this.modalData[data]?.people || []);
              break;
            default:
              formControl[data].setValue(this.modalData[data]);
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

}
