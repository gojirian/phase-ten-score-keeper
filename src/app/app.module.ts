import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RootPage } from '../pages/root/root';
import { SetupPage } from '../pages/setup/setup';
import { GamePage } from '../pages/game/game';
import { RoundPage } from '../pages/round/round';
import { PlayerPage } from '../pages/player/player';

@NgModule({
  declarations: [
    MyApp,
    RootPage,
    SetupPage,
    RoundPage,
    PlayerPage,
    GamePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RootPage,
    SetupPage,
    RoundPage,
    PlayerPage,
    GamePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
