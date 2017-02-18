import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Player page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {
	private player: any;
  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
  				public viewCtrl: ViewController) {
  	this.player = navParams.get('player');
  	console.log(this.player)
  }

  closePlayer(){
  	this.viewCtrl.dismiss();
  }
}
