import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Round page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-round',
  templateUrl: 'round.html'
})
export class RoundPage {
	public players: any[];
	public round: number;
	public winner : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.players = this.navParams.get('players');
  	this.round = this.navParams.get('round');
  	this.players.forEach((player)=>{
  		player.currentScore = null;
  	})
  }

  onSave() {

  	this.players.forEach((player) => {
  		if(!player.rounds) {
  			player.rounds = [];
  		}
  		player.rounds.push({
  			score : Number(player.currentScore),
  			phase : player.phase
  		})
  		if ( player.currentScore < 50){
  			player.phase = player.phase + 1;
  		}
  		player.currentScore = null;
  	})

  	return this.viewCtrl.dismiss({
  		players : this.players,
  		winnner : this.winner
  	})
  }



}
