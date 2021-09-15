import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '', component: DashboardComponent
      }
    ])
  ]
})
export class DashboardModule { }
