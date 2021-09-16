import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './admin-list.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AdminListComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AdminListComponent
      }
    ])
  ]
})
export class AdminListModule { }
