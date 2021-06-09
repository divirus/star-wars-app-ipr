import { NgModule } from '@angular/core';
import {DetailModalComponent} from './components/detail-modal/detail-modal.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  declarations: [DetailModalComponent, HeaderComponent],
  exports: [DetailModalComponent, HeaderComponent],
})
export class SharedModule {}
