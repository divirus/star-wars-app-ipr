import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-relatable-elements',
  templateUrl: './relatable-elements.component.html',
  styleUrls: ['./relatable-elements.component.scss']
})
export class RelatableElementsComponent implements OnInit {
  @Input() elements: any;

  constructor() {}

  ngOnInit(): void {
  }

}
