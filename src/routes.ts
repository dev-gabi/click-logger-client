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
      import('./pages/dashboard/dashboard.component').then(
        (d) => d.DashboardComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login.component').then((l) => l.LoginComponent),
  },
  {
    path: 'stats',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (d) => d.DashboardComponent
      ),
    children: [
              {
                path: 'page',
                loadComponent: () =>
                  import('./pages/dashboard/stats/page-stats/page-stats.component').then(
                    (s) => s.PageStatsComponent
                  ),
              },
              {
                path: 'user',
                loadComponent: () =>
                  import('./pages/dashboard/stats/user-stats/user-stats.component').then(
                    (s) => s.UserStatsComponent
                  ),
              },
    ],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((a) => a.AboutComponent),
  },
];
