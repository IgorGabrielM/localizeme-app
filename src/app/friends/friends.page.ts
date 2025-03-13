import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {ToastController} from "@ionic/angular";
import {Friend, User} from "../../models/user.model";
import {catchError, forkJoin, of} from "rxjs";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
  standalone: false
})
export class FriendsPage implements OnInit {
  uuid: string;
  searchText: string;
  user: User;

  constructor(
      private locationService: LocationService,
      private toastController: ToastController
  ) {}

  ngOnInit() {
    this.uuid = localStorage.getItem('user-uuid');
    this.loadUser();
  }

  loadUser() {
    this.locationService.getLocation(this.uuid).subscribe((userRes) => {
      this.locationService.getUserFriends().pipe(
          catchError((err) => {
            console.error('Erro ao buscar amigos', err);
            return of([]);
          })
      ).subscribe((friendsData) => {
        this.user = {
          ...userRes,
          friends: friendsData,
        };
      });
    });
  }

  sendInviteFriend(){
    this.locationService.addFriend(this.searchText).subscribe(async () => {
      this.searchText = '';
      const toast = await this.toastController.create({
        message: 'Amigo adicionado com sucesso!',
        duration: 2000,
        position: 'bottom',
      });

      await toast.present();
      this.loadUser();
    })
  }

  async copyToClipboard(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.opacity = '0';
    selBox.value = this.uuid;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    const toast = await this.toastController.create({
      message: 'ID copiado com sucesso!',
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
}
