import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { IPlayer } from 'src/types';

@Component({
  selector: 'app-round',
  templateUrl: './round.page.html',
  styleUrls: ['./round.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RoundPage {

  public players: IPlayer[] = [];
  public round: number = 1;
  public winner: IPlayer | null = null;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.modalCtrl.getTop().then(modal => {
      console.log(modal);

      if (modal) {



        const { players, round } = modal.componentProps as { players: IPlayer[], round: number };
        this.players = players;
        this.round = round;

        this.players.forEach(player => {
          player.currentScore = null;
        });
      }
    });
  }

  onSave() {
    let lowestScore: number|null = null;
    let winner: IPlayer|null = null;

    if (this.players.some(player => player.currentScore === null || player.currentScore === undefined)) {
      this.toastCtrl.create({
        message: 'Please enter a score for each player',
        duration: 2000
      }).then(toast => toast.present());
      return
    }
    // check if only one player has 0
    if (this.players.filter(player => player.currentScore === 0).length === 1) {
      winner = this.players.find(player => player.currentScore === 0) ?? null;
    } else {
      // show alert
      this.toastCtrl.create({
        message: 'Only one player can have a score of 0',
        duration: 2000
      }).then(toast => toast.present());
      return;
    }


    this.players.forEach((player) => {
      if (!player.rounds) {
        player.rounds = [];
      }
      player.rounds.push({
        score: Number(player.currentScore),
        phase: player.phase || 1
      })
      player.phase = player.phase ? player.phase : 1;
      if (!player.currentScore || player.currentScore < 50) {
        player.phase = player.phase + 1;
      }

      player.currentScore = null;
    })

    return this.modalCtrl.dismiss({
      players: this.players,
      winnner: this.winner
    })
  }

}
