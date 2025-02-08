import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { GamePage } from '../game/game.page';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonBackButton, IonLabel, IonItem, IonList, IonInput } from '@ionic/angular/standalone';
import { IPlayer } from 'src/types';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonBackButton, IonLabel, IonItem, IonList, IonInput]
})
export class SetupPage implements OnInit, AfterViewInit {
  @ViewChild('player') playerInput!: ElementRef<HTMLInputElement>;
  players: IPlayer[] = [];
  newPlayer: IPlayer = { name: '', rounds: [], total: 0, phase: null };
  phases: number = 10;

  constructor(private router: Router) { }

  ngOnInit() {
    this.players.push({
      name: 'Nat',
      rounds: [],
      phase: null,
      total: 0
    });
    this.players.push({
      name: 'Beka',
      rounds: [],
      phase: null,
      total: 0
    });
  }

  ngAfterViewInit() {
    console.log(this.playerInput); // playerInput should be defined here
  }


  removePlayer(player: IPlayer) {
    this.players = this.players.filter(p => p !== player);
    this.playerInput.nativeElement?.focus();

  }

  addPlayer() {
    this.players.push({
      name: this.newPlayer.name,
      rounds: [],
      total: 0,
      phase: null
    });
    this.newPlayer.name = '';
    this.playerInput?.nativeElement?.focus();

  }

  onBegin() {
    this.router.navigate(['/game/play'], {
      queryParams: {
        players: JSON.stringify(this.players),
        phases: this.phases,
      },
    });
    console.log('Navigating to Game Page');
  }
}
