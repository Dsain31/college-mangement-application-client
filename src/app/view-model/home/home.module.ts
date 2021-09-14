import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {SharedModule} from 'src/app/shared/shared.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent
      }
    ])
  ],
  providers: []
})
export class HomeModule { }
