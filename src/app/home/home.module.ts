import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { HomePage } from './home.page';
import {LocationService} from "../../services/location.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HomePageRoutingModule} from "./home-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [HomePage],
  providers: [LocationService, HttpClient]
})
export class HomePageModule {}
