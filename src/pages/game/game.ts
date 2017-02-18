import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController } from 'ionic-angular';

import { RoundPage } from '../round/round';
import { PlayerPage } from '../player/player';
/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

	private startTime : any;
	private endTime : any;
	private round : number = 1;
	private phases : number;
	public players : any[];
	public inTen : any[] = [];

  	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				public modalCtrl: ModalController,
  				public alertCtrl: AlertController) {
  		this.players = this.navParams.get('players');
  		this.phases = this.navParams.get('phases');
  		this.players.forEach((player) => {
  			player.phase = 1;
  			player.total = 0;
  		})

  	}

	ionViewWillLoad() {
  		this.startTime = new Date();
	}

	endGame() {
		
		let players = this.getPlayers(); 	
		
		this.decalreWinner(players[0])
	}

	endRound(){
		let modal = this.modalCtrl.create(RoundPage, {
			players: this.players,
			round: this.round
		});
		modal.present();

		modal.onDidDismiss((data) => {
			
			this.players = data.players;
			this.round++;
			// this.winner = data.winner;
			
			this.players.forEach((player) => {
				if (player.phase > this.phases){
					this.inTen.push(player)
				}
				player.total = 0;

				player.rounds.forEach((round) =>{
					player.total = Number(player.total) + Number(round.score)
				});
				return player;
			});
			if(this.inTen.length > 0) {
				let winners = this.inTen.sort((a, b)=> {
					return a.total - b.total;
				});
				this.decalreWinner(winners[0]);
			}


		});
	}

	decalreWinner(player: any){
		let ties = [];
		this.players.forEach((playerEl) => {
			// if ( playerEl.name != player.name ){
				if ( playerEl.total == player.total ){
					ties.push(playerEl)
				}
			// }
		})
		console.log(ties)
		let alertObj : any;
		if(ties.length > 1){
			let message = 'The tie was between';
			ties.forEach((playerTie)=>{
				message += "<br>" + playerTie.name ;
			})
			
			message += "<br> with score: " + player.total;
			alertObj = {
			      title: 'Game Over!',
			      subTitle: 'It was a tie',
			      message : message,
			      buttons: ['OK']
			  };	
		}
		else{
			alertObj = {
				      title: 'Game Over!',
				      subTitle: player.name + ' has Won the Game',
				      buttons: ['OK']
			}
		}
			let alert = this.alertCtrl.create(alertObj);
		alert.present();
		alert.onDidDismiss(()=>{
			this.navCtrl.popToRoot();
		})
	}

	getPlayers(){
		return this.players.sort((a, b) =>{
			return a.total - b.total;
		})
	}

	showPlayer(player: any){
		let modal = this.modalCtrl.create(PlayerPage, {
			player: player
		});
		modal.present()
	}

}
