import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dash',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (d) => d.DashboardComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login.component').then((l) => l.LoginComponent),
  },
  {
    path: 'stats',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (d) => d.DashboardComponent
      ),
    children: [
      {
        path: 'page',
        loadComponent: () =>
          import('./stats/page-stats/page-stats.component').then(
            (s) => s.PageStatsComponent
          ),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./stats/user-stats/user-stats.component').then(
            (s) => s.UserStatsComponent
          ),
      },
    ],
  },
];
