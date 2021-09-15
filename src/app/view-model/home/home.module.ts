import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {SharedModule} from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from 'src/app/utils/pipe/capitalize.pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [HomeComponent, CapitalizePipe],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent
      }
    ])
  ],
  providers: []
})
export class HomeModule { }
