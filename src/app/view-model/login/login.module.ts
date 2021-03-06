import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {SharedModule} from 'src/app/shared/shared.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'', component: LoginComponent
      }
    ])
  ],
  providers: []
})
export class LoginModule { }
