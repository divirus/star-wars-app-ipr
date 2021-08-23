import { NgModule } from '@angular/core';
import {DetailModalComponent} from './components/detail-modal/detail-modal.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { RelatableElementsComponent } from './components/relatable-elements/relatable-elements.component';

@NgModule({
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  declarations: [DetailModalComponent, HeaderComponent, RelatableElementsComponent],
  exports: [DetailModalComponent, HeaderComponent],
})
export class SharedModule {}
