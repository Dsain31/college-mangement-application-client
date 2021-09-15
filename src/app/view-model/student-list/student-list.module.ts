import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [StudentListComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild([
      {
        path:'', component: StudentListComponent
      }
    ])
  ]
})
export class StudentListModule { }
