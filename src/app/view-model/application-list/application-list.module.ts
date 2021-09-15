import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationListComponent } from './application-list.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ApplicationListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '', component: ApplicationListComponent
      }
    ])
  ]
})
export class ApplicationListModule { }
