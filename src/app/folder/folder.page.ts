import {Component, OnDestroy, OnInit} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})
export class FolderPage implements OnInit, OnDestroy {
  mapActivate = false;
  map: any;
  latitude: number = 51.505;
  longitude: number = -0.09;
  marker: any;
  watchId: any;

  constructor() {}

  ngOnInit() {
    Geolocation.checkPermissions().then((res) => {
      if (res.location === 'granted' && res.coarseLocation === 'granted'){
        this.startWatchingPosition();

        setTimeout(() => {
          this.initMap(this.latitude, this.longitude);
        }, 1000)
      } else {
        Geolocation.requestPermissions().then(() => {
          this.startWatchingPosition();
        })
      }
    })
  }

  ngOnDestroy() {
    if (this.watchId) {
      this.stopWatchingPosition();
    }
  }

  initMap(lat, long) {
    this.map = leaflet.map('map', {
      center: [lat, long],
      zoom: 15,
    });

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(this.map);

    this.marker = leaflet
      .marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup('Você está aqui!')
      .openPopup();
  }

  async startWatchingPosition() {
    this.watchId = Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      (position, error) => {
        if (error) {
          console.error('Erro ao obter a localização:', error);
          return;
        }

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        console.log(`Nova posição: Latitude: ${this.latitude}, Longitude: ${this.longitude}`);

        this.updateMarker();
      }
    );
  }

  updateMarker() {
    if (this.marker) {
      this.marker.setLatLng([this.latitude, this.longitude]);
      this.map.setView([this.latitude, this.longitude], 13);
    }
  }

  stopWatchingPosition() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
      console.log('Parando a observação da localização');
    }
  }
}
