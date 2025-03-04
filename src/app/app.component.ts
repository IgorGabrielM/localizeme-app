import {Component, OnInit} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'Home', url: '/folder', icon: 'home' },
    { title: 'Friends', url: '/friends', icon: 'people' },
  ];
  constructor() {}

  ngOnInit() {
    this.checkAndGenerateUUID();
  }

  checkAndGenerateUUID() {
    let uuid = localStorage.getItem('user-uuid');
    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem('user-uuid', uuid);
      console.log('Novo UUID gerado e armazenado:', uuid);
    } else {
      console.log('UUID já existente no localStorage:', uuid);
    }
  }
}
