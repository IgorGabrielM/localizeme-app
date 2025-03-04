import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as leaflet from 'leaflet';
import { LocationService } from "../../services/location.service";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})
export class FolderPage implements OnInit, OnDestroy {
  mapActivate = true;
  map: any;
  marker: any;
  watchId: any;
  friendMarkers: any[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    Geolocation.checkPermissions().then((res) => {
      if (res.location === 'granted' && res.coarseLocation === 'granted') {
        this.startWatchingPosition();
      } else {
        Geolocation.requestPermissions().then(() => {
          this.startWatchingPosition();
        });
      }
    });
    setInterval(() => {
      this.loadFriendsLocation();
    }, 5000)
  }

  ngOnDestroy() {
    this.stopWatchingPosition();
  }

  initMap(lat, long) {
    this.map = leaflet.map('map', {
      center: [lat, long],
      zoom: 1.5,
    });

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(this.map);

    this.marker = leaflet
      .marker([lat, long])
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

        setTimeout(() => {
          this.initMap(position.coords.latitude, position.coords.longitude);
          this.loadFriendsLocation();
        }, 100);

        this.locationService.saveLocation(position.coords.latitude, position.coords.longitude).subscribe();
      }
    );
  }

  stopWatchingPosition() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
      this.watchId = undefined;
    }
  }

  async loadFriendsLocation() {
    this.locationService.getUserFriends().subscribe(async (friends) => {
      this.friendMarkers.forEach((marker) => {
        marker.remove();
      });
      this.friendMarkers = [];

      for (const friend of friends) {
        try {
          const friendLocation = await this.locationService.getLocation(friend.friendUuid).toPromise();
          const friendMarker = leaflet
            .marker([friendLocation.latitude, friendLocation.longitude])
            .addTo(this.map)
            .bindPopup(`${friendLocation.username}`)

          this.friendMarkers.push(friendMarker);
        } catch (error) {
          console.error('Erro ao obter a localização do amigo:', error);
        }
      }
    });
  }
}
