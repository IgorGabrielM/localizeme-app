import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl: string = 'http://192.168.0.9:3000/location';

  constructor(private http: HttpClient) {}

  saveLocation(latitude: number, longitude: number): Observable<any> {
    const username = localStorage.getItem('user-name');
    const uuid = localStorage.getItem('user-uuid');
    const locationData = { latitude, longitude, username };
    return this.http.post(`${this.baseUrl}/save/${uuid}`, locationData);
  }

  getLocation(uuid: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${uuid}`);
  }

  addFriend(friendUuid: string) {
    const userUuid = localStorage.getItem('user-uuid');
    return this.http.post(`${this.baseUrl}/addFriend`, {
      userUuid,
      friendUuid,
    });
  }


  getUserFriends(): Observable<any> {
    const uuid = localStorage.getItem('user-uuid');
    return this.http.get(`${this.baseUrl}/getUserFriends/${uuid}`);
  }
}
