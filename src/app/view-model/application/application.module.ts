import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './components/application-list/application.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { ApplicationService } from 'src/app/model/application.service';



@NgModule({
  declarations: [ApplicationComponent, ApplicationFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: ApplicationComponent
      }
    ])
  ],
  providers: [ApplicationService]
})
export class ApplicationModule { }
