import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SetupPage } from '../setup/setup';
/*
  Generated class for the Root page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-root',
  templateUrl: 'root.html'
})
export class RootPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RootPage');
  }

  startGame() {
  	this.navCtrl.push(SetupPage)
  }

}
