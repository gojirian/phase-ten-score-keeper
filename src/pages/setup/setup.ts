import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';
/*
  Generated class for the Setup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
	private players: any[];
  	private new: any;
  	private phases: number;
  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.players = [];
  		this.new = {
  			name : ""
  		}
  		this.phases = 10;
  	}

  	ionViewDidLoad() {
		this.players.push({
			name  : "Nat"
		})
		this.players.push({
			name  : "Beka"
		})
  	}

  	addPlayer() {
  		this.players.push({
  			name: this.new.name,
  			rounds : [],
  			total  : 0
  		});
  		this.new.name = "";
  	}

  	onBegin() {
  		this.navCtrl.push(GamePage, { 
  			players : this.players,
  			phases : this.phases

  		})
  		console.log("Pushing new Page")
  	}

}
