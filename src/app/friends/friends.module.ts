import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FriendsPage } from './friends.page';
import {FriendsPageRoutingModule} from "./friends-routing.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LocationService} from "../../services/location.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [FriendsPage],
  providers: [LocationService, HttpClient]
})
export class FriendsPageModule {}
