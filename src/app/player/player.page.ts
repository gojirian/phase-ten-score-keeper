import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButtons, IonCol, IonRow, IonList, IonItem, IonIcon, IonButton, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IPlayer } from 'src/types';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, IonCol, IonRow, IonList, IonItem, IonIcon, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [ModalController]
})
export class PlayerPage implements OnInit {
  public player: IPlayer = {
    name: 'Unknown',
    rounds: [],
    total: 0,
    phase: null
  }

  constructor(private modalController: ModalController) {
    this.modalController.getTop().then(modal => {
      if (modal) {
        this.player = modal.componentProps as IPlayer;
      } else {
        this.modalController.dismiss(this.player);
      }
    });
  }

  async ngOnInit() {
  }

  closePlayer() {
    this.modalController.dismiss();
  }
}
