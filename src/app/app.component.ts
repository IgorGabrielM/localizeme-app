import {Component, OnInit} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Amigos', url: '/friends', icon: 'people' },
  ];

  constructor(
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.presentAlert();
  }

  async presentAlert() {
    let uuid = localStorage.getItem('user-uuid');
    if (!uuid) {
      const alert = await this.alertController.create({
        header: 'A Short Title Is Best',
        subHeader: 'A Sub Header Is Optional',
        message: 'A message should be a short, complete sentence.',
        inputs: [
          {
            placeholder: 'Username',
            name: 'username'
          }
        ],
        buttons: [
          {
            text: 'Action',
            handler: (data) => {
              uuid = uuidv4();
              localStorage.setItem('user-uuid', uuid);
              localStorage.setItem('user-name', data.username);
            }
          }
        ],
      });
      await alert.present();
    }
  }
}
