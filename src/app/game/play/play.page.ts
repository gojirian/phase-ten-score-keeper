import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  ModalController,
  AlertController
} from '@ionic/angular/standalone';

import { RoundPage } from '../round/round.page';
import { PlayerPage } from '../../player/player.page';
import { IPlayer, IRound } from 'src/types';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'page-game',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class PlayPage {

  private startTime: Date | null = null;
  private endTime: Date | null = null;
  public round: number = 1;
  public phases: number = 10;
  public players: IPlayer[] = [
    { name: 'Player 1', rounds: [], total: 0, phase: null },
    { name: 'Player 2', rounds: [], total: 0, phase: null }
  ];
  public inTen: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe({
      next: (params) => {
        console.log('Query Params: ', params);

        if (params['players']) {
          this.players = JSON.parse(params['players']);
        }
        if (params['phases']) {
          this.phases = params['phases'] || 10;
        }

        this.startTime = new Date();
        this.endTime = null;

        this.players.forEach((player) => {
          player.phase = 1;
          player.total = 0;
        });
      }
    });

  }

  ionViewWillEnter() {
    this.startTime = new Date();
  }

  ionViewWillLeave() {
    console.log('Game Over');
    this.endTime = new Date();
    if (!this.startTime) {
      return;
    }
    console.log('Game Time: ', this.endTime.getTime() - this.startTime.getTime());
  }

  async endGame() {
    let players = this.getPlayers();
    this.declareWinner(players[0]);
  }

  async endRound() {
    const modal = await this.modalCtrl.create({
      component: RoundPage,
      componentProps: {
        players: this.players,
        round: this.round
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.players = data.players;
      this.round++;

      this.players.forEach((player) => {
        if (!player.phase) {
          player.phase = 1;
        }
        if (player.phase > this.phases) {
          this.inTen.push(player);
        }
        player.total = 0;

        if (!player.rounds) {
          player.rounds = [];
        }

        player.rounds.forEach((round: IRound) => {
          player.total = Number(player.total) + Number(round.score);
        });
      });

      if (this.inTen.length > 0) {
        let winners = this.inTen.sort((a, b) => a.total - b.total);
        this.declareWinner(winners[0]);
      }
    }
  }

  async declareWinner(player: any) {
    let ties = this.players.filter(p => p.total === player.total);

    let alertObj: any;
    if (ties.length > 1) {
      let message = 'The tie was between:<br>';
      ties.forEach(playerTie => {
        message += `<br>${playerTie.name}`;
      });
      message += `<br> with score: ${player.total}`;
      alertObj = {
        header: 'Game Over!',
        subHeader: 'It was a tie',
        message: message,
        buttons: ['OK']
      };
    } else {
      alertObj = {
        header: 'Game Over!',
        subHeader: `${player.name} has Won the Game`,
        buttons: ['OK']
      };
    }

    const alert = await this.alertCtrl.create(alertObj);
    await alert.present();

    alert.onDidDismiss().then(() => {
      history.back(); // Equivalent of `this.navCtrl.popToRoot();`
    });
  }

  getPlayers() {
    return this.players.sort((a, b) => a.total - b.total);
  }

  async showPlayer(player: any) {
    const modal = await this.modalCtrl.create({
      component: PlayerPage,
      componentProps: { player }
    });

    await modal.present();
  }
}
