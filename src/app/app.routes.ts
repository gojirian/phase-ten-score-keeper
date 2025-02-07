import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'player/:id',
    loadComponent: () => import('./player/player.page').then(m => m.PlayerPage)
  },
  {
    path: 'game',
    children: [
      {
        path: 'setup',
        loadComponent: () => import('./game/setup/setup.page').then(m => m.SetupPage)
      },
      {
        path: 'play',
        loadComponent: () => import('./game/play/play.page').then(m => m.PlayPage)
      },
    ]
  },
];
