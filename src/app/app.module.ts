import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './view-model/header/header.component';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    CommonModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
