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
          formControl[data].setValue(this.modalData[data]);
        });
    }

    this.formGroup = this.fb.group(formControl);
  }

  onClose(): void {
    this.closeModal.emit();
    this.modalData = null;
  }

}
